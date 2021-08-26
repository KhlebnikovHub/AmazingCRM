require('dotenv').config();

const express = require('express');
const morgan = require('morgan');
const hbs = require('hbs');
const path = require('path');
//session
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const redisClient = redis.createClient();

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth')
  .OAuth2Strategy;
const flash = require('connect-flash');



const PORT = process.env.PORT || 3000;
const app = express();

const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const clientsRouter = require('./routes/clients');
const ordersRouter = require('./routes/orders');
const adminRouter = require('./routes/admin');





function checkAuth() {
  return app.use((req, res, next) => {
    if (req.user) next()
    else res.redirect('/login');
  });
}

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


app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json());


module.exports = passport;

app.use('/', indexRouter);
app.use('/user', userRouter);
app.use('/clients', clientsRouter);
app.use('/orders', ordersRouter);
app.use('/admin', adminRouter);




app.listen(PORT, '0.0.0.0', () => {
    console.log('Server start on ', PORT)
});


