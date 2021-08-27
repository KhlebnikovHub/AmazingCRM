const router = require('express').Router();
const { OrderStatus } = require('../db/models');
const { Orders } = require('../db/models');
const { initUser } = require('../middlewares/initUser');


router.route('/')
  .get(initUser, async (req, res) => {
    
    if (req?.session?.passport) {
      res.locals.name = req.session.passport.user.displayName;
      res.locals.img = req.session.passport.user.photos[0].value;
      res.locals.auth = req.session.passport.user?.moderator || req.session.passport.user?.admin;
      res.locals.admin = req.session.passport.user?.admin;
    }
    const awaitDelivery = await Orders.findAll({raw:true, where: {status_id:'1'}})
    const inWork = await Orders.findAll({raw:true, where: {status_id:'2'}})
    const delivered = await Orders.findAll({raw:true, where: {status_id:'3'}})
    const ready = await Orders.findAll({raw:true, where: {status_id:'4'}})
    const document = await Orders.findAll({raw:true, where: {status_id:'5'}})
    const allStatus = await OrderStatus.findAll({raw:true});


    const allStatusesCount = [awaitDelivery.length, inWork.length,
      delivered.length,
      ready.length,
      document.length
    ]

    const countOrders = allStatus.map((el, i) => ({
      ...el,
      count:allStatusesCount[i]
    }))
    console.log(countOrders);
    res.render('index', {countOrders});
  });
module.exports = router;
