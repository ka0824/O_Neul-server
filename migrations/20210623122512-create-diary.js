'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Diary', {
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
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "User",
          key: "id"
        }
      },
      music_id: {
        type: Sequelize.INTEGER,
        references: {
          model: "Music",
          key: "id"
        }
      },
      public: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Diary');
  }
};