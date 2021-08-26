const router = require('express').Router();
const {User} = require('../db/models');
const {OrderStatus} = require('../db/models');

router.route('/')
.get(async (req, res) => {
  const allStatus = await OrderStatus.findAll()
  res.locals.user = req.session.user
  res.render('index', {allStatus})
})

module.exports = router;
