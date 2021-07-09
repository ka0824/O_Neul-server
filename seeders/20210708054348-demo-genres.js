'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('genres', [
      {
        genre: "Jazz"
      },
      {
        genre: "Rock"
      },
      {
        genre: "Cinematic"
      },
      {
        genre: "Rap"
      },
      {
        genre: "ETC"
      },
      {
        genre: "Electronica"
      },
      {
        genre: "Acoustic"
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('genres', null, {});
  }
};
