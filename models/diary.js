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
      // define association here
    }
  };
  diary.init({
    id: DataTypes.INTEGER,
    date: DataTypes.STRING,
    feeling: DataTypes.INTEGER,
    weather: DataTypes.INTEGER,
    image: DataTypes.STRING,
    text: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    music_id: DataTypes.INTEGER,
    public: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'diary',
  });
  return diary;
};