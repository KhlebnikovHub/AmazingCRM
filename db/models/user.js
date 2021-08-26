'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Clients,ClientComment,OrderComment}) {
      // define association here
      User.hasMany(Clients, {
        foreignKey: "user_id"
      });
      User.hasMany(ClientComment, {
        foreignKey: "user_id"
      });
      User.hasMany(OrderComment,{
        foreignKey:"user_id",
      })
      User.hasMany(Orders,{
        foreignKey:"user_id",
      })
    }
  };
  User.init({
    type: DataTypes.STRING,
    email: {
      unique: true,
      type: DataTypes.STRING,
    },
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    phoneNumb: DataTypes.STRING,
    authorization: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
