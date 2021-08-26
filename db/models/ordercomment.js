'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Orders, {
        foreignKey: "id_order",
      }),
      this.belongsTo(models.User,{
        foreignKey:"user_id",
      })
    }
  };
  OrderComment.init({
    user_id:DataTypes.INTEGER,
    id_order: DataTypes.INTEGER,
    comment: DataTypes.TEXT,
    date: DataTypes.DATEONLY,
  }, {
    sequelize,
    modelName: 'OrderComment',
  });
  return OrderComment;
};
