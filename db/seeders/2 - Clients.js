'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Clients', [
    {
      name: "Andry",
      lastName: "qwerdfghty",
      fatherland: "hjfghh",
      address: "tyfghb",
      phone: "1234567890678",
      email: "vh7g@mail.ru",
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Ivan",
      lastName: "qrty",
      fatherland: "hjh",
      address: "tyb",
      phone: "167890678",
      email: "vh8g@mail.ru",
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Lidia",
      lastName: "qwerty",
      fatherland: "hjghjklh",
      address: "tyvbnmb",
      phone: "1234567898",
      email: "vh76g@mail.ru",
      user_id: 1,
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
