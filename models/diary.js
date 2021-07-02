'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class diary extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.diary.hasMany(models.emphathy, { foreignKey: 'diaryId', sourceKey: 'id' })
      models.diary.belongsTo(models.music, { foreignKey: 'musicId', sourceKey: 'id' });
    }
  };
  diary.init({
    date: DataTypes.STRING,
    feeling: DataTypes.INTEGER,
    weather: DataTypes.INTEGER,
    image: DataTypes.STRING,
    text: DataTypes.STRING,
    isPublic: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'diary',
    timestamps: false
  });
  return diary;
};