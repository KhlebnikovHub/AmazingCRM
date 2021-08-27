'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Categories', [
      {
      categories: "Столы",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categories: "Кровати",
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      categories: "Стулья",
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
