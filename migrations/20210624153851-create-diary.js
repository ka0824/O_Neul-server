'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('diaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      date: {
        type: Sequelize.STRING
      },
      feeling: {
        type: Sequelize.INTEGER
      },
      weather: {
        type: Sequelize.INTEGER
      },
      image: {
        type: Sequelize.STRING
      },
      text: {
        type: Sequelize.STRING
      },
      isPublic: {
        type: Sequelize.BOOLEAN
      },
    }, {
      timestamps: false,
    },);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('diaries');
  }
};