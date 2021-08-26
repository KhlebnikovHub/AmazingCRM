'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Client, {
        foreignKey: "user_id"
      });
      this.hasMany(models.ClientComment, {
        foreignKey: 'user_id',
      });
      this.hasMany(models.OrderComment, {
        foreignKey: 'user_id',
      });
      this.hasMany(models.Orders, {
        foreignKey: 'user_id',
      });
    }
  }
  User.init(
    {
      type: DataTypes.STRING,
      email: {
        unique: true,
        type: DataTypes.STRING,
      },
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      phoneNumb: DataTypes.STRING,
      authorization: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'User',
    }
  );
  return User;
};
