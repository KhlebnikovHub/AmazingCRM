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
    res.render('order', { order })

  })

  .post( async (req, res) => {
    try {
      const newClient = await Orders.create(req.body);
      const user =await Orders.findOne({
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
        where:{id:newClient.id}
      })
      console.log(user);
      return res.json(user);
    } catch (err) {
      console.log(err);
    }
  
  })

router.route('/:id')
  .get( async (req, res) => {
    console.log("id vrvtrb",req.params.id)
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
  
    res.locals.thisOrder = thisOrder;
    res.locals.allOrderComment = allOrderComment; 
    console.log("lalalala", thisOrder)
    res.render('thisOrder')
  })


module.exports = router;
