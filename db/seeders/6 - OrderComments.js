'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('OrderComments', [
      {
        user_id:2,
        id_order: 1,
        comment: "DataTypesTEXT",
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id:1,
        id_order: 3,
        comment: "TEXT",
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id:2,
        id_order: 2,
        comment: "Data",
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        user_id:2,
        id_order: 4,
        comment: "Datsdfghj;lkjhgfdsxcvgbhjkl;kjhgaTypesTEXT",
        date: new Date(),
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
