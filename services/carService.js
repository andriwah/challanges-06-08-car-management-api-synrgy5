const carRepositories = require("../repositories/carRepository");
const cloudinary = require("../utils/cloudinary");

class CarServices {
  static async created({ name, plate, manufacture, model, year, price, size, capacity, image, description, available, createdBy }) {
    try {
      if (!name) {
        return {
          status: false,
          status_code: 400,
          message: "name Is Required!",
          data: {
            registered_user: null,
          },
        };
      }

      if (!plate) {
        return {
          status: false,
          status_code: 400,
          message: "plate Is Required!",
          data: {
            registered_user: null,
          },
        };
      }

      if (!manufacture) {
        return {
          status: false,
          status_code: 400,
          message: "manufacture Is Required!",
          data: {
            registered_user: null,
          },
        };
      }

      if (!model) {
        return {
          status: false,
          status_code: 400,
          message: "model Is Required!",
          data: {
            registered_user: null,
          },
        };
      }

      if (!year) {
        return {
          status: false,
          status_code: 400,
          message: "year Is Required!",
          data: {
            registered_user: null,
          },
        };
      }

      if (!price) {
        return {
          status: false,
          status_code: 400,
          message: "price Is Required!",
          data: {
            registered_user: null,
          },
        };
      }

      if (!size) {
        return {
          status: false,
          status_code: 400,
          message: "size Is Required!",
          data: {
            registered_user: null,
          },
        };
      }

      if (!capacity) {
        return {
          status: false,
          status_code: 400,
          message: "capacity Is Required!",
          data: {
            registered_user: null,
          },
        };
      }

      if (!image) {
        return {
          status: false,
          status_code: 400,
          message: "image Is Required!",
          data: {
            registered_user: null,
          },
        };
      }

      if (!description) {
        return {
          status: false,
          status_code: 400,
          message: "description Is Required!",
          data: {
            registered_user: null,
          },
        };
      }

      if (!available) {
        return {
          status: false,
          status_code: 400,
          message: "available Is Required!",
          data: {
            registered_user: null,
          },
        };
      }

      const isCarExist = await carRepositories.getCarByName({ name });

      if (isCarExist) {
        return {
          status: false,
          status_code: 400,
          message: "Car is already exist",
          data: {
            registered_user: null,
          },
        };
      } else {
        //  Cloudinary
        const fileToUpload = image;
        const fileBase64 = fileToUpload.buffer.toString("base64");
        const file = `data:${fileToUpload.mimetype};base64,${fileBase64}`;

        const cloudinaryUploader = await cloudinary.uploader.upload(file, { folder: "avatar" }, (err, result) => {
          if (err) {
            res.status(400).send(`Failed to upload file to cloudinary: ${err.message}`);
            return;
          } else {
            return result;
          }
        });
        const whoIsCreated = createdBy;
        const created_car = await carRepositories.created({
          name,
          plate,
          manufacture,
          model,
          year,
          price,
          size,
          capacity,
          image: cloudinaryUploader.url,
          description,
          available,
          createdBy: whoIsCreated,
        });

        return {
          status: true,
          status_code: 201,
          message: "Created Car Succesfully",
          data: {
            registered_user: created_car,
          },
        };
      }
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          created_car: null,
        },
      };
    }
  }

  static async getCars(condition) {
    try {
      const getCars = await carRepositories.getByQueryParams(condition);

      if (!condition) {
        return {
          status: false,
          status_code: 401,
          message: "Not Found ",
          data: {
            cars: null,
          },
        };
      }

      return {
        status: true,
        status_code: 201,
        message: "Succesfully ",
        data: {
          cars: getCars,
        },
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          created_car: null,
        },
      };
    }
  }

  static async getCarById({ id }) {
    try {
      const getCars = await carRepositories.getById({ id });

      if (!getCars) {
        return {
          status: false,
          status_code: 401,
          message: "Not Found ",
          data: {
            find: null,
          },
        };
      }

      return {
        status: true,
        status_code: 201,
        message: "Succesfully ",
        data: {
          find: getCars,
        },
      };
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          find: null,
        },
      };
    }
  }

  static async updated({ id, name, plate, manufacture, model, year, price, size, capacity, image, description, available, updatedBy }) {
    try {
      if (!name || !plate || !manufacture || !model || !year || !price || !size || !capacity || !image || !description || !available) {
        return {
          status: false,
          status_code: 400,
          message: "Updated field is required",
          data: {
            updated: null,
          },
        };
      }

      const getCarById = await carRepositories.getById({ id });

      if (!getCarById) {
        return {
          status: false,
          status_code: 400,
          message: "Car Not Found",
          data: {
            findCar: null,
          },
        };
      } else {
        //  Cloudinary
        const fileToUpload = image;
        const fileBase64 = fileToUpload.buffer.toString("base64");
        const file = `data:${fileToUpload.mimetype};base64,${fileBase64}`;

        const cloudinaryUploader = await cloudinary.uploader.upload(file, { folder: "avatar" }, (err, result) => {
          if (err) {
            res.status(400).send(`Failed to upload file to cloudinary: ${err.message}`);
            return;
          } else {
            return result;
          }
        });
        const whoIsUpdated = parseInt(updatedBy);
        const updated_car = await carRepositories.updated({
          id,
          name,
          plate,
          manufacture,
          model,
          year,
          price,
          size,
          capacity,
          image: cloudinaryUploader.url,
          description,
          available,
          updatedBy: whoIsUpdated,
        });

        return {
          status: true,
          status_code: 201,
          message: "Updated Car Succesfully ",
          data: {
            updated: updated_car,
          },
        };
      }
    } catch (err) {
      return {
        status: false,
        status_code: 500,
        message: err.message,
        data: {
          updated: null,
        },
      };
    }
  }

  static async deleted({ id, deletedBy }) {
    try {
      const whoIsDeleted = deletedBy;
      const deleted_Car = await carRepositories.deleted({
        id,
        deletedBy: whoIsDeleted,
      });
      if (deleted_Car == 0) {
        return {
          status: "NOT_FOUND",
          statusCode: 404,
          message: "Car not found",
          data: {
            deleted_car: null,
          },
        };
      } else {
        return {
          status: "OK",
          statusCode: 200,
          message: "car deleted",
          data: {
            deleted_car: deleted_Car,
          },
        };
      }
    } catch (err) {
      return {
        status: "INTERNAL_SERVER_ERROR",
        statusCode: 500,
        message: err,
        data: {
          deleted_car: null,
        },
      };
    }
  }
}

module.exports = CarServices;
