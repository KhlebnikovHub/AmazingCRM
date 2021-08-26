'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

      this.belongsTo(models.Client, {

        foreignKey:"client_id",
      })
      this.hasMany(models.OrderComment, {
        foreignKey: "id_order",
      })
      this.hasMany(models.OrderItems,{
        foreignKey: "order_id",
      })
      this.belongsTo(models.User, {
        foreignKey: "user_id",
      })
      this.belongsTo(models.OrderStatus, {
        foreignKey: "status_id",
      })
    }
  };
  Orders.init({
    user_id: DataTypes.INTEGER,
    client_id: DataTypes.INTEGER,
    deliveryPrice: DataTypes.INTEGER,
    assemblyPrice: DataTypes.INTEGER,
    dataDelivery: DataTypes.DATEONLY,
    dataAssembly: DataTypes.DATEONLY,
    brigadeDelivery: DataTypes.INTEGER,
    brigadeAssembly: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};
