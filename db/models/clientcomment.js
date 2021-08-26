'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ClientComment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Client,User}) {
      // define association here
      ClientComment.belongsTo(Client, {
        foreignKey: "id_client",
      })
      ClientComment.belongsTo(User, {
        foreignKey: "user_id",
      })
    }
  };
  ClientComment.init({
    user_id: DataTypes.INTEGER,
    id_client: DataTypes.INTEGER,
    comment: DataTypes.STRING,
    date: DataTypes.DATEONLY,
  }, {
    sequelize,
    modelName: 'ClientComment',
  });
  return ClientComment;
};
