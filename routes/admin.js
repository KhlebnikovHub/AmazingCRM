const router = require('express').Router();
// const sequelize = require('../db/connection')
const { QueryTypes } = require('sequelize');

const { User, Products, Categories } = require('../db/models');

router
  .route('/users')
  .get(async (req, res) => {
    let users;
    try {
      users = await User.findAll();
    } catch (error) {
      res.render('error', {
        message: 'Something went wrong',
        error: {},
      });
    }

    res.render('admin/users', { users });
  })
  .post(async (req, res) => {
    try {
      const curUser = await User.findByPk(req.body.curId);
      res.json(curUser);
    } catch (err) {
      res.sendStatus(500).end();
    }
  })
  .patch(async (req, res) => {
    try {
      const { email, superselect: type, phoneNumb, curId } = req.body;
      const name = req.body.username.split(' ');
      const firstName = name[0];
      const lastName = name[1];
      const editUser = await User.update(
        { email, type, phoneNumb, firstName, lastName },
        { where: { id: curId } }
      );
      const last = await User.findByPk(curId);
      return res.json(last);
    } catch (error) {
      res.sendStatus(500).end();
    }
  })
  .delete(async (req, res) => {
    try {
      const deleted = await User.destroy({ where: { id: req.body.curId } });
      return res.json(deleted);
    } catch (error) {
      res.sendStatus(500).end();
    }
  });

router.route('/products').get(async (req, res) => {
  const products = await Products.findAll();

  res.render('admin/products', { products });
});

router
  .route('/categories')
  .get(async (req, res) => {
    const categories = await Categories.findAll();

    res.render('admin/categories', { categories });
  })
  .post(async (req, res) => {
    try {
      const curCategory = await Categories.findByPk(req.body.curId);
      res.json(curCategory);
    } catch (err) {
      res.sendStatus(500).end();
    }
  })
  .patch(async (req, res) => {
    try {
      const { category: categories, curId } = req.body;
      const editCategory = await Categories.update({ categories }, { where: { id: curId } });
      const last = await Categories.findByPk(curId);
      return res.json(last);
    } catch (error) {
      res.sendStatus(500).end();
    }
  })
  .delete(async (req, res) => {
    try {
      const deleted = await Categories.destroy({ where: { id: req.body.curId } });
      return res.json(deleted);
    } catch (error) {
      res.sendStatus(500).end();
    }
  });

router.post('/categories/new', async (req, res) => {
  try {
    const { category } = req.body;
    const newCategory = await Categories.findOrCreate({
      where: { categories: category },
      defaults: { categories: category },
    });
    return res.json(newCategory);
  } catch (error) {
    res.sendStatus(500).end();
  }
});

router.post('/categories/all', async (req, res) => {});

module.exports = router;
