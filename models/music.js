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
      models.music.belongsTo(models.genre, { foreignKey: 'genreId', sourceKey: 'id' });
      models.music.hasMany(models.diary, { foreignKey: 'musicId', sourceKey: 'id' });
    }
  };
  music.init({
    audio: DataTypes.STRING,
    name: DataTypes.STRING,
    duration: DataTypes.STRING,
    author: DataTypes.STRING,
    img: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'music',
    timestamps: false
  });
  return music;
};