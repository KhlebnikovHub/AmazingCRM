'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      type: {
        
        type: Sequelize.STRING
      },
      email: {
        
        unique:true,
        type: Sequelize.STRING
      },
      firstName: {
        
        type: Sequelize.STRING
      },
      lastName: {
        
        type: Sequelize.STRING
      },
      phoneNumb: {
        type: Sequelize.STRING
      },
      authorization: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Users');
  }
};
