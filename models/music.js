'use strict';

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class music extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      music.belongsTo(models.genre, {
        foreignKey: 'genreId'
      });
    }
  };
  music.init({
    path: DataTypes.STRING,
    title: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'music',
  });
  return music;
};