const { Car } = require('../models');
const { Op } = require('sequelize');

class CarRepositories {
  static async created({ name, plate, manufacture, model, year, price, size, capacity, image, description, available, createdBy }) {
    const created_car = await Car.create({
      name,
      plate,
      manufacture,
      model,
      year,
      price,
      size,
      capacity,
      image,
      description,
      available,
      createdBy,
    });
    return created_car;
  }

  static async getCarByName({ name }) {
    const getCarByName = await Car.findOne({
      where: {
        name,
      },
    });
    return getCarByName;
  }

  static async getByQueryParams({ attributes, where }) {
    const getByQueryParams = await Car.findAll({ attributes, where });

    return getByQueryParams;
  }

  static async getById({ id }) {
    const getPost = await Car.findOne({
      where: {
        id,
        deletedAt: {
          [Op.eq]: null,
        },
      },
    });

    return getPost;
  }

  static async updated({ id, name, plate, manufacture, model, year, price, size, capacity, image, description, available, updatedBy }) {
    const updated_car = await Car.update(
      {
        name,
        plate,
        manufacture,
        model,
        year,
        price,
        size,
        capacity,
        image,
        description,
        available,
        updatedBy,
      },
      { where: { id } }
    );
    return updated_car;
  }

  static async deleted({ id, deletedBy }) {
    const deletedPost = await Post.update(
      {
        deletedAt: new Date().getTime(),
        deletedBy,
      },
      { where: { id }, deletedAt: null }
    );

    return deletedPost;
  }
}

module.exports = CarRepositories;
