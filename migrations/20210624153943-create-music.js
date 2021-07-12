'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('music', {
      id: {
        allowNull: true,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      audio: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.STRING
      },
      author: {
        type: Sequelize.STRING
      },
      img: {
        type: Sequelize.STRING
      },
    }, {
      initialAutoIncrement: 0,
      timestamps: false,
    });
   
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('music');
  }
};