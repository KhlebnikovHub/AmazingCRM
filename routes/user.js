require('dotenv').config();
const router = require('express').Router();
const passport = require('passport');

router.get('/main', async (req, res) => {
  console.log('MAIN>>>>>>>>>>>>>>>', 'REQ. USER', req.user);
  console.log('REQ. SEEESION', req.session?.passport);
  if (req?.session?.passport) {
    res.locals.name = req.session.passport.user.displayName;
    console.log("I'm HERE! +=)+");
    console.log(res.locals.name);
  }
  res.render('main');
});

router.get(
  '/signIn',
  passport.authenticate('google', {
    scope: ['email', 'profile'],
  })
);

router.get(
  '/signIn/callback',
  passport.authenticate('google', {
    failureRedirect: '/signIn',
    successRedirect: '/',
  })
);

router.get('/logOut', (req, res) => {
  req.session.destroy();
  res.clearCookie('sId').redirect('/');
});

module.exports = router;
