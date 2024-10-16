'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.Rental, { foreignKey: 'rental_id' });
    }
  }
  Review.init({
    rating: DataTypes.TINYINT,
    komentar: DataTypes.TEXT,
    tgl_review: DataTypes.DATE,
    rental_id: DataTypes.INTEGER
    // user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};