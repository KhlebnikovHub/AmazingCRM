'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Clients', [
    {
      name: "Andry",
      lastName: "qwerty",
      fatherland: "hjh",
      address: "tyb",
      phone: "1234567890678",
      email: "vhg@mail.ru",
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Ivan",
      lastName: "qwerty",
      fatherland: "hjh",
      address: "tyb",
      phone: "1234567890678",
      email: "vhg@mail.ru",
      user_id: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      name: "Lidia",
      lastName: "qwerty",
      fatherland: "hjh",
      address: "tyb",
      phone: "1234567890678",
      email: "vhg@mail.ru",
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
