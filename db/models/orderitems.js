'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderItems extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Orders,{
        foreignKey: "order_id",
      }),
      this.belongsTo(models.Products,{
        foreignKey: "product_id",
      })

    }
  };
  OrderItems.init({
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    count: DataTypes.INTEGER,
    item: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderItems',
  });
  return OrderItems;
};
