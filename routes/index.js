const router = require('express').Router();
const {OrderStatus} = require('../db/models');
const {Orders} = require('../db/models');

router.route('/')
.get(async (req, res) => {
  const allStatus = await OrderStatus.findAll()
  res.locals.user = req.session.user
  res.render('index', {allStatus})
})





// router.route('/')
// .get(async (req, res) => {

//   console.log('MAIN>>>>>>>>>>>>>>>', 'REQ. USER', req.user);
//   console.log('REQ. SEEESION', req.session);
//   if(req?.session?.passport) {
//   res.locals.name = req.session.passport.user.displayName;
//   console.log('I\'m HERE! +=)+');
//   console.log(res.locals.name);   
// }

// res.render('main');

// });

















module.exports = router;
