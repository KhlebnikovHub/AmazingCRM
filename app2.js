require('dotenv').config();

const express = require('express'),
  app = express(),
  session = require('express-session'),
  passport = require('passport'),
  GoogleStrategy = require('passport-google-oauth')
    .OAuth2Strategy,
  flash = require('connect-flash')

const host = '127.0.0.1';
const port = 3000;

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

function checkAuth() {
  return app.use((req, res, next) => {
    if (req.user) next()
    else res.redirect('/login');
  });
}

app.set('view engine', 'hbs');


app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(session({ secret: 'you secret key' }))
// app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL:
        'http://127.0.0.1:3000/auth/google/callback',
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile)
    }
  )
)

app.get('/main', async (req, res) => {

  console.log('MAIN>>>>>>>>>>>>>>>', 'REQ. USER', req.user);
  console.log('REQ. SEEESION', req.session?.passport);
  if(req?.session?.passport) {
  res.locals.name = req.session.passport.user.displayName;
  console.log('I\'m HERE! +=)+');
  console.log(res.locals.name);   
}
  res.render('main');


});

app.get('/login', (req, res) => {
  console.log('REQ. USER', req.user);
  console.log('REQ. SEEESION', req.session);
  res.send('Login page. Please, authorize. <a href = "/auth/google"> Войти</a>');
})

app.get(
  '/auth/google',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
)

app.get(
  '/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    successRedirect: '/home',
  })
)


app.get('/home', (req, res) => {
  console.log('REQ. USER', req.user);
  console.log('REQ. SEEESION', req.session);
  res.send("Home page. You're authorized.")
})

app.listen(port, host, function () {
  console.log(`Server listens http://${host}:${port}`)
})
