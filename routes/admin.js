const router = require('express').Router();

const { User } = require('../db/models');



router.route('/users')
  .get(async (req, res) => {
    let users;
    try {
      users = await User.findAll();
    } catch (error) {
      res.render('error', {
        message: 'Something went wrong', error: {},
      });
    }

    res.render('admin/users', { users })
  })
  .post(async (req, res) => {
    console.log(req.body);
    try {
    const curUser = await User.findByPk(req.body.curId);
    res.json(curUser);
    } catch (err) {
      console.log(err);
      res.sendStatus(500).end();
    }
  })
  .patch(async (req, res) => {
    console.log(req.body);
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
  //console.log("lalalala", allComment)
  res.render('thisClient')
})



module.exports = router;
