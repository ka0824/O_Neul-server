'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('hashtags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hashtag: {
        type: Sequelize.STRING
      },
    }, {
      timestamps: false,
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('hashtags');
  }
};