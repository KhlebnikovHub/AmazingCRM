'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Orders', [
      {
        user_id: 1,
        client_id: 1,
        deliveryPrice: 12,
        assemblyPrice: 5,
        dataDelivery: new Date(),
        dataAssembly: new Date(),
        brigadeDelivery: 4,
        brigadeAssembly: 1,
        status_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        client_id: 3,
        deliveryPrice: 102,
        assemblyPrice: 59,
        dataDelivery: new Date(),
        dataAssembly: new Date(),
        brigadeDelivery: 2,
        brigadeAssembly: 6,
        status_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        client_id: 2,
        deliveryPrice: 112,
        assemblyPrice: 15,
        dataDelivery: new Date(),
        dataAssembly: new Date(),
        brigadeDelivery: 5,
        brigadeAssembly: 2,
        status_id: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        client_id: 3,
        deliveryPrice: 162,
        assemblyPrice: 125,
        dataDelivery: new Date(),
        dataAssembly: new Date(),
        brigadeDelivery: 3,
        brigadeAssembly: 3,
        status_id: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id: 1,
        client_id: 1,
        deliveryPrice: 11,
        assemblyPrice: 1,
        dataDelivery: new Date(),
        dataAssembly: new Date(),
        brigadeDelivery: 1,
        brigadeAssembly: 2,
        status_id: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
