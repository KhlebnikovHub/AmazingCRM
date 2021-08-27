const router = require('express').Router();

const { User, Products } = require('../db/models');



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
    try {
    const { email, superselect: type, phoneNumb, curId } = req.body;
    const name = req.body.username.split(' ');
    const firstName = name[0];
    const lastName = name[1];
    let editUser = await User.update({email, type, phoneNumb, firstName, lastName }, {where: { id: curId}});
    let last = await User.findByPk(curId);
    return res.json(last);
    } catch (error) {
      console.log(error);
      res.sendStatus(500).end();
    }
  });


router.route('/products')
  .get(async (req, res) => {
    let products = await Products.findAll();

    res.render('admin/products', { products })
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
