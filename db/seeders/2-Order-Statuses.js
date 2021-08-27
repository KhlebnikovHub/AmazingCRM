'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('OrderStatuses', [
      {
      status: "Ожидание поставки",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      status: "В работе",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      status: "Доставлен",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      status: "Собран",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      status: "Рекламация",
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
