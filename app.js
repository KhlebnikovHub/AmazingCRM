require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');
const flash = require('connect-flash');

//session
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const redisClient = redis.createClient();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth')
  .OAuth2Strategy;

  const { checkUser } = require('./middlewares/checkUser');
  const { checkSuper } = require('./middlewares/checkSuper');
  const { checkAdmin } = require('./middlewares/checkAdmin');

const PORT = process.env.PORT || 3000;
const app = express();

const userRouter = require('./routes/user');
const indexRouter = require('./routes/index');
const clientsRouter = require('./routes/clients');
const ordersRouter = require('./routes/orders');
const adminRouter = require('./routes/admin');


passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))



app.set('view engine', 'hbs');
hbs.registerPartials(__dirname + '/views/partials');
//  middlewares

//  session
app.use(
  session({
    name: 'sId',
    store: new RedisStore({ client: redisClient }),
    saveUninitialized: false,
    secret: process.env.SESSIONSECRET,
    resave: false,
    cookie: { maxAge: 60000 * 60 * +process.env.cookieHours },
  }),
);

// app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:  
        'http://127.0.0.1:3000/user/signIn/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile)
    }
  )
)


app.use(express.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());


module.exports = passport;

app.use('/user', userRouter);
app.use('/', indexRouter);
app.use(checkUser);
app.use(checkSuper);
app.use(async (req, res, next) => {
  if (req?.session?.passport) {
    res.locals.name = req.session.passport.user.displayName;
    res.locals.img = req.session.passport.user.photos[0].value;
    res.locals.auth = req.session.passport.user?.moderator || req.session.passport.user?.admin;
    res.locals.admin = req.session.passport.user?.admin;
  }
  next();
});
app.use('/clients', clientsRouter);
app.use('/orders', ordersRouter);
app.use(checkAdmin);
app.use('/admin', adminRouter);




app.listen(PORT, '0.0.0.0', () => {
    console.log('Server start on ', PORT)
});


