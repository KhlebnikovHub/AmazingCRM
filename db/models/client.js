'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Client extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, ClientComments,Orders}) {
      // define association here
      Client.belongsTo(User, {
        foreignKey: "user_id",
      })
      Client.hasMany(ClientComments, {
        foreignKey: "id_client",

      });
      Client.hasMany(Orders,{
        foreignKey:"client_id",
      })
    }
  };
  Client.init({
    name: DataTypes.STRING,
    lastName: DataTypes.STRING,
    fatherland: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Client',
  });
  return Client;
};