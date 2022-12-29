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
      // define association here
    }
  }
  Car.init({
    name: DataTypes.STRING,
    plate: DataTypes.STRING,
    manufacture: DataTypes.STRING,
    model: DataTypes.STRING,
    year: DataTypes.INTEGER,
    price: DataTypes.STRING,
    size: DataTypes.ENUM('small', 'medium', 'large'),
    capacity: DataTypes.INTEGER,
    description: DataTypes.STRING,
    image: DataTypes.TEXT,
    available: DataTypes.BOOLEAN,
    createdBy: DataTypes.STRING,
    updatedBy: DataTypes.STRING,
    deletedBy: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Car',
  });
  return Car;
};