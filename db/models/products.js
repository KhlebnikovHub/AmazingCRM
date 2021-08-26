'use strict';
const {
  Model
} = require('sequelize');
const { FOREIGNKEYS } = require('sequelize/types/lib/query-types');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Categories,OrderItems}) {
      // define association here
      Products.belongsTo(Categories,{
        foreignKey: "categories_id",
      }),
      Products.hasMany(OrderItems,{
        foreignKey: "product_id",
      })
      
    }
  };
  Products.init({
    categories_id: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};
