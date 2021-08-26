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
    static associate({Client,OrderComment,OrderItems,User,OrderStatus}) {
      // define association here
      Orders.belongsTo(Client,{
        foreignKey:"client_id",
      })
      Orders.hasMany(OrderComment, {
        foreignKey: "id_order",
      })
      Orders.hasMany(OrderItems,{
        foreignKey: "order_id",
      })
      Orders.belongsTo(User, {
        foreignKey: "user_id",
      })
      Orders.belongsTo(OrderStatus, {
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
