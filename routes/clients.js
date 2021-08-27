const router = require('express').Router();
const { Client } = require('../db/models');
const { ClientComment } = require('../db/models');
const { User } = require('../db/models');


router.get('/', async (req, res) => {
  let client;
  try {
    client = await Client.findAll();
  } catch (error) {
    res.render('error', {
      message: 'Something went wrong', error: {},
    });
  }
  console.log('-------', req.session.user_id)
  res.render('client', { client,user:req.session.user_id})
})

router.post('/', async (req, res) => {
  try {
    const newClient = await Client.create(req.body);
    return res.json(newClient);
  } catch (err) {
    console.log(err);
  }

})

router.get('/:id', async (req, res) => {

  let thisclient = await Client.findAll({
    where: { id: req.params.id },
    include: [{
      model: User,
      as: 'User'
    }],
  })
  let allComment = await ClientComment.findAll({
    include: [{
      model: User,
      as: 'User'
    }],
    where: { id_client: req.params.id }
  })

  res.locals.thisclient = thisclient;
  res.locals.allComment = allComment;
  res.render('thisClient')
})


module.exports = router;
