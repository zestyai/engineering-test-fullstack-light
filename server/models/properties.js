'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Properties extends Model {    
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Properties.init({
    geocode_geo: { type: DataTypes.GEOGRAPHY, allowNull: true },
    parcel_geo: { type: DataTypes.GEOGRAPHY, allowNull: true },
    building_geo: { type: DataTypes.GEOGRAPHY, allowNull: true },
    image_bounds: { type: DataTypes.ARRAY(DataTypes.FLOAT(8)), allowNull: true },
    image_url: { type: DataTypes.TEXT, allowNull: false }
  }, {
    sequelize,
    modelName: 'Properties',
    tableName: "properties",
    timestamps: false
  });
  return Properties;
};