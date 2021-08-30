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

  res.render('client', { client, user: req.session.user_id })
})

router.post('/', async (req, res) => {
  try {
    const newClient = await Client.create(req.body);
    console.log(newClient)
    return res.json(newClient);
  } catch (err) {
    console.log(err);
  }

})

router.get('/:id', async (req, res) => {
  console.log("kjhgfsdfgh",req.params)
  let thisclient = await Client.findAll({
    include: [{
      model: User,
      as: 'User'
    }],
    where: { id: req.params.id },

  })
  let allComment = await ClientComment.findAll({
    include: [{
      model: User,
      as: 'User'
    }],
    where: { id_client: req.params.id }
  })
  // res.locals.id = req.params.id;
  res.locals.thisclient = thisclient;
  res.locals.allComment = allComment;
  res.render('thisClient', { user: req.session.user_id ,id:req.params.id})
})


router.post('/:id/comments', async (req, res) => {
  try {
    const newComment = await ClientComment.create({ ...req.body, id_client: req.params.id });
    const user = await ClientComment.findOne({
      include: [{
        model: User,
        as: 'User'
      }],
      where: { id: newComment.id }
    })
    console.log(user)
    return res.json(user)
  } catch (err) {
    console.log(err);
  }
})

router.delete('/:id', async (req, res) => {
 console.log(req.params.id);
  try {
    await Client.destroy({ where: { id: req.params.id } });
    return res.sendStatus(200)
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
})

// router.put('/:id', async (req, res) => {
//   console.log("fndnflnkjgbsg")
//   let entry;
//   try {
//     entry = await Client.update(
//       {
//       name: req.body.name, 
//       lastName: req.body.lastName,
//       fatherland: req.body.fatherland,
//       address: req.body.address,
//       phone: req.body.phone,
//       email: req.body.email
//       },
//        {where:{id:req.params.id}, 
//        returning: true,
//        plain: true
//       });
//       console.log("------------------------",entry)
//   } catch (error) {
//     return res.json({ 
//       isUpdateSuccessful: false, 
//       errorMessage: 'Не удалось обновить запись в базе данных.' 
//     });
//   }
//   return res.json({ isUpdateSuccessful: true, entryID: entry[1].id });
// });

// router.get('/:id/edit', async (req, res) => {
//   let entry = await Client.findOne({where:{id:req.params.id}});
//   res.render('clients/edit', { entry });
// });


module.exports = router;
