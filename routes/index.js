const router = require('express').Router();
const { OrderStatus } = require('../db/models');
const { Orders } = require('../db/models');
const { initUser } = require('../middlewares/initUser');


router.route('/')
  .get(initUser, async (req, res) => {
    
    console.log('MAIN>>>>>>>>>>>>>>>', 'REQ. USER', req?.user);
    console.log('REQ. SEEESION', req.session?.passport?.user);
    if (req?.session?.passport) {
      res.locals.name = req.session.passport.user.displayName;
      res.locals.img = req.session.passport.user.photos[0].value;
      res.locals.auth = req.session.passport.user?.moderator || req.session.passport.user?.admin;
      res.locals.admin = req.session.passport.user?.admin;
      console.log('I\'m HERE! +=)+');
      console.log(res.locals.name);
    }
    const allStatus = await OrderStatus.findAll();
    res.render('index', { allStatus });
  });


module.exports = router;
