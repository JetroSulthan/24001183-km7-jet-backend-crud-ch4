'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Car extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Car.hasMany(models.Rental, { foreignKey: 'car_id' });
    }
  }
  Car.init({
    model: DataTypes.STRING,
    tahun: DataTypes.INTEGER,
    no_plat: DataTypes.STRING,
    status: DataTypes.STRING,
    harga: DataTypes.BIGINT,
    foto_mobil: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};