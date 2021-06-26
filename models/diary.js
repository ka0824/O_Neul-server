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
    date: DataTypes.STRING,
    feeling: DataTypes.INTEGER,
    weather: DataTypes.INTEGER,
    image: DataTypes.STRING,
    text: DataTypes.STRING,
    public: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'diary',
  });
  return diary;
};