'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('diaries', 'userId', {
      type: 'integer',
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('diaries', 'musicId', {
      type: 'integer',
      references: {
        model: 'music',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.addColumn('emphathies', 'diaryId', {
      type: 'integer',
      references: {
        model: 'diaries',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    
    await queryInterface.addColumn('emphathies', 'userId', {
      type: 'integer',
      references: {
        model: 'users',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
    
    await queryInterface.addColumn('music', 'genreId', {
      type: 'integer',
      references: {
        model: 'genres',
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });

    await queryInterface.createTable('hashtags_diary', {
      
      postId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'diaries',
          key: 'id'
        }
      },
      hashtagId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'hashtags',
          key: 'id'
        }
      }
    });

  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('diaries', 'userId')
    await queryInterface.removeColumn('diaries', 'musicId')
    await queryInterface.removeColumn('emphathies', 'diaryId')
    await queryInterface.removeColumn('emphathies', 'userId')
    await queryInterface.removeColumn('music', 'genreId')
    await queryInterface.dropTable('hashtags_diary');
  }
};