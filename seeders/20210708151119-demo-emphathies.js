'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('emphathies', [
     {
       diaryId: 4,
       userId: 1
     },
     {
       diaryId: 3,
       userId: 2,
     },
     {
       diaryId: 2,
       userId: 1
     },
     {
      diaryId: 1,
      userId: 1
     },
     {
      diaryId: 4,
      userId: 3
     },
     {
      diaryId: 1,
      userId: 4
     }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('emphathies', null, {});
  }
};
