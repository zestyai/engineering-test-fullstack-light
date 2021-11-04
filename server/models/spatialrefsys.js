'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class SpatialRefSys extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  SpatialRefSys.init({
    srid: { type: DataTypes.INTEGER, primaryKey: true },
    auth_name: DataTypes.STRING(256),
    auth_srid: DataTypes.INTEGER,
    srtext: DataTypes.STRING(2048),
    proj4text: DataTypes.STRING(2048)
  }, {
    sequelize,
    modelName: 'SpatialRefSys',
    tableName: "spatial_ref_sys",
    timestamps: false
  });
  
  return SpatialRefSys;
};