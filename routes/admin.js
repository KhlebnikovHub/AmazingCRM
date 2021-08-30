const router = require('express').Router();
// const sequelize = require('../db/connection')
const { QueryTypes } = require('sequelize')

const { User, Products, Categories } = require('../db/models');



router.route('/users')
  .get(async (req, res) => {
    let users;
    try {
      users = await User.findAll();
    } catch (error) {
      res.render('error', {
        message: 'Something went wrong', error: { },
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
      let editUser = await User.update({ email, type, phoneNumb, firstName, lastName }, { where: { id: curId } });
      let last = await User.findByPk(curId);
      return res.json(last);
    } catch (error) {
      console.log(error);
      res.sendStatus(500).end();
    }
  })
  .delete(async (req, res) => {
    try {
      let deleted = await User.destroy({ where: { id: req.body.curId } });
      return res.json(deleted);
    } catch (error) {
      console.log(error);
      res.sendStatus(500).end();
    }

  })


router.route('/products')
  .get(async (req, res) => {
    let products = await Products.findAll({ include: [{ model: Categories }]});
    console.log(products);
    res.render('admin/products', { products });
  })
  .delete(async (req, res) => {
    try {
      let deleted = await Products.destroy({ where: { id: req.body.curId } });
      return res.json(deleted);
    } catch (error) {
      console.log(error);
      res.sendStatus(500).end();
    }

  });


  router.route('/products/edit')
    .post(async (req, res) => {
      const { curId } = req.body;
      try {
      const ourProduct = await Products.findOne({where: { id: curId }, include: [{ model: Categories }] });
      return res.json(ourProduct);  
      } catch (error) {
        console.log(error);
        return res.sendStatus(500).end();
      }

    })
    .patch(async (req, res) => {
      const { category, description, stock, price, curId } = req.body;
      try {
        const edited = await Products.update({ categories_id: category, description, stock, price }, { where: { id: curId } })
        return res.json({ edited });  
      } catch (error) {
        console.log(error);
        res.sendStatus(500).end();
      }
    })

router.route('/products/new')
  .post(async (req, res) => {
    try {
      const { category, description, stock, price } = req.body;
      const newProduct = await Products.create(
        { categories_id: category, description, stock, price });
      const superNewProduct = await Products.findOne({where: { id: newProduct.dataValues.id },
         include: [{ model: Categories }]});
      return res.json(superNewProduct);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500).end();
    }
  })


router.route('/categories')
  .get(async (req, res) => {
    let categories = await Categories.findAll();

    res.render('admin/categories', { categories })
  })
  .post(async (req, res) => {
    console.log(req.body);
    try {
      const curCategory = await Categories.findByPk(req.body.curId);
      res.json(curCategory);
    } catch (err) {
      console.log(err);
      res.sendStatus(500).end();
    }
  })
  .patch(async (req, res) => {

    try {
      const { category: categories, curId } = req.body;
      let editCategory = await Categories.update({ categories }, { where: { id: curId } });
      let last = await Categories.findByPk(curId);
      return res.json(last);
    } catch (error) {
      console.log(error);
      res.sendStatus(500).end();
    }


  })
  .delete(async (req, res) => {
    try {
      let deleted = await Categories.destroy({ where: { id: req.body.curId } });
      return res.json(deleted);
    } catch (error) {
      console.log(error);
      res.sendStatus(500).end();
    }

  });


router.post('/categories/new', async (req, res) => {
  try {
    const { category } = req.body;
    const newCategory = await Categories.findOrCreate({ where: { categories: category }, defaults: { categories: category } });
    return res.json(newCategory);
  } catch (error) {
    console.log(error);
    res.sendStatus(500).end();
  }

})

router.post('/categories/all', async (req, res) => {
  try {
    const allCategories = await Categories.findAll({ raw: true });
    return res.json(allCategories);
  } catch (error) {
    console.lor(error);
    return res.sendStatus(500).end();
  }
});





module.exports = router;
