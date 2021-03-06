'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class user extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.user.hasMany(models.emphathy, { foreignKey: 'userId', sourceKey: 'id' });
    }
  };
  user.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    nickname: DataTypes.STRING,
    picture: DataTypes.STRING,
    isSocialLogin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'user',
    timestamps: false
  });
  return user;
};