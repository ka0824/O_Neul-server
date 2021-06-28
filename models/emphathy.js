'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class emphathy extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.emphathy.belongsTo(models.diary, { foreignKey: 'diaryId', sourceKey: 'id' });
      models.emphathy.belongsTo(models.user, { foreignKey: 'diaryId', sourceKey: 'id' });
    }
  };
  emphathy.init({
    
  }, {
    sequelize,
    modelName: 'emphathy',
  });
  return emphathy;
};