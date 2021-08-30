'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "Users"
          },
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      client_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { 
            tableName: "Clients" 
          },
          key: "id"
        },
        onDelete: 'CASCADE'
      },
      deliveryPrice: {
        type: Sequelize.INTEGER
      },
      assemblyPrice: {
        type: Sequelize.INTEGER
      },
      dataDelivery: {
        type: Sequelize.DATEONLY
      },
      dataAssembly: {
        type: Sequelize.DATEONLY
      },
      brigadeDelivery: {
        type: Sequelize.INTEGER
      },
      brigadeAssembly: {
        type: Sequelize.INTEGER
      },
      status_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: "OrderStatuses"
          },
          key: "id"
        },
        onDelete: 'CASCADE'
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
    await queryInterface.dropTable('Orders');
  }
};
