'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ClientComments', [
      {
        user_id:1,
        id_client:2,
        comment:"lalsdlrkmgkmsrtm",
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
