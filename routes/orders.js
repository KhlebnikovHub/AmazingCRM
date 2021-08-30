const router = require('express').Router();
const { User } = require('../db/models');
const { Orders } = require('../db/models');
const { Client } = require('../db/models');
const { OrderStatus } = require('../db/models');
const { OrderComment } = require('../db/models');

router.route('/')
  .get(async (req, res) => {
    let order;
    try {
      order = await Orders.findAll({
        include: [{
          model: User,
          as: 'User'
        },
        {
          model: Client,
          as: 'Client'
        },
        {
          model: OrderStatus,
          as: 'OrderStatus'
        }
        ],
      });
    } catch (error) {
      res.render('error', {
        message: 'Something went wrong', error: {},
      });
    }
    //console.log(order)
    res.render('order', { order, user: req.session.user_id })

  })

  .post(async (req, res) => {
    try {
      const newClient = await Orders.create(req.body);
      const user = await Orders.findOne({
        include: [{
          model: User,
          as: 'User'
        },
        {
          model: Client,
          as: 'Client'
        },
        {
          model: OrderStatus,
          as: 'OrderStatus'
        }],
        where: { id: newClient.id }
      })
      console.log(user);
      return res.json(user);
    } catch (err) {
      console.log(err);
    }

  })

router.route('/:id')
  .get(async (req, res) => {
    let thisOrder = await Orders.findAll({
      include: [{
        model: User,
        as: 'User'
      },
      {
        model: Client,
        as: 'Client'
      },
      {
        model: OrderStatus,
        as: 'OrderStatus'
      }
      ],
      where: { id: req.params.id }

    })
    let allOrderComment = await OrderComment.findAll({
      include: [{
        model: User,
        as: 'User'
      }
      ],
      where: { id_order: req.params.id }
    })
    res.locals.id = req.params.id;
    res.locals.thisOrder = thisOrder;
    res.locals.allOrderComment = allOrderComment;
    res.render('thisOrder', { user: req.session.user_id })
  })


router.post('/:id/comments', async (req, res) => {
  try {
    
    const newComment = await OrderComment.create({ ...req.body, id_order: req.params.id });
    const user = await OrderComment.findOne({
      include: [{
        model: User,
        as: 'User'
      }],
      where: { id: newComment.id }
    })
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

//  router.put('/:id', async (req, res) => {
//   let entry;
//   try {
//     entry = await Client.update({
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
 
//   } catch (error) {
//     return res.json({ 
//       isUpdateSuccessful: false, 
//       errorMessage: 'Не удалось обновить запись в базе данных.' 
//     });
//   }
//   return res.json({ isUpdateSuccessful: true, entryID: entry });
// });

module.exports = router;
