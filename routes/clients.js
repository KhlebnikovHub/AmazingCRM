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

  res.render('client', { client })
})

router.get('/:id', async (req, res) => {
  let thisclient = await Client.findOne({ where: { id: req.params.id } })
  //console.log(thisclient)

  let allComment = await ClientComment.findAll({
    include: [{
      model: User,
      as: 'User'
    }],
    where: { id_client: req.params.id }
  })

  res.locals.thisclient = thisclient;
  res.locals.allComment = allComment;
  console.log("lalalala", allComment)
  res.render('thisClient')
})


module.exports = router;
