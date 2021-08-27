'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', [
      {
        type: "maneger",
        email: "feirbv@jrvi",
        firstName: "ehcirvrvg",
        lastName: "ygeygfrer",
        phoneNumb: "2386847687",
        authorization: true,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        type: "maneger",
        email: "fei56rbv@jrvi",
        firstName: "ehcirvrvfghg",
        lastName: "ygeygffuffghvhgvhgrer",
        phoneNumb: "23862132847687",
        authorization: true,
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
