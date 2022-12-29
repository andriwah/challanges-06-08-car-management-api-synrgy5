const carServices = require('../services/carService');

const createdCar = async (req, res) => {
  const { name, plate, manufacture, model, year, price, size, capacity, description, available } = req.body;

  const { status, status_code, message, data } = await carServices.created({
    name,
    plate,
    manufacture,
    model,
    year,
    price,
    size,
    capacity,
    image: req.file,
    description,
    available,
    createdBy: req.user.id,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getCars = async (req, res) => {
  let cond = { attributes: ['id', 'name', 'size', 'price', 'image', 'plate', 'manufacture', 'model', 'year', 'capacity', 'description', 'createdBy', 'createdAt', 'updatedBy', 'updatedAt', 'deletedBy', 'deletedAt', 'available'] };
  let params = req.query;

  if (params.size) {
    cond.where = {
      size: params.size,
      deletedAt: {
        [Op.ne]: null,
      },
    };
  }

  const { status, status_code, message, data } = await carServices.getCars(cond);

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const getCarById = async (req, res) => {
  const { id } = req.params;

  const { status, status_code, message, data } = await carServices.getCarById({ id });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const updatedCar = async (req, res) => {
  const { name, plate, manufacture, model, year, price, size, capacity, description, available } = req.body;
  const { id } = req.params;

  const { status, status_code, message, data } = await carServices.updated({
    id,
    name,
    plate,
    manufacture,
    model,
    year,
    price,
    size,
    capacity,
    image: req.file,
    description,
    available,
    updatedBy: req.user.id,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

const deletedCar = async (req, res) => {
  const { id } = req.params;

  const { status, status_code, message, data } = await carServices.deleted({
    id,
    deletedBy: req.user.id,
  });

  res.status(status_code).send({
    status: status,
    message: message,
    data: data,
  });
};

module.exports = { createdCar, getCars, getCarById, updatedCar, deletedCar };
