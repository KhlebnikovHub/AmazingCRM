const router = require('express').Router();







router.route('/')
.get(async (req, res) => {

  console.log('MAIN>>>>>>>>>>>>>>>', 'REQ. USER', req.user);
  console.log('REQ. SEEESION', req.session.passport.user);
  if(req?.session?.passport) {
  res.locals.name = req.session.passport.user.displayName;
  res.locals.img = req.session.passport.user.photos[0].value;
  console.log('I\'m HERE! +=)+');
  console.log(res.locals.name);   
}

res.render('main');

});

















module.exports = router;
