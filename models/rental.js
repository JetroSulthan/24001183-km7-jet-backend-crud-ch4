'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Rental extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Rental.belongsTo(models.User, { foreignKey: 'user_id' });
      Rental.belongsTo(models.Car, { foreignKey: 'car_id' });
      Rental.hasMany(models.Review, { foreignKey: 'rental_id' });
    }
  }
  Rental.init({
    tgl_peminjaman: DataTypes.DATE,
    tgl_pengembalian: DataTypes.DATE,
    total_harga: DataTypes.BIGINT,
    status: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    car_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Rental',
  });
  return Rental;
};