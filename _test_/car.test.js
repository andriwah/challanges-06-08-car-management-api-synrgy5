const request = require("supertest");
const { app, server } = require("../server");
const path = require("path");
const bcrypt = require("bcrypt");
const carRepository = require("../repositories/carRepository");
const usersRepository = require("../repositories/userRepository");
const authService = require("../services/authServices");
const { log } = require("console");

beforeEach(async () => {
  await server.close();
});

// 1. Create Car
describe("POST /car/create", () => {
  it("should response with 201 as status code", async () => {
    const rawPassword = "qwerty123";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const filePath = path.join(__dirname, "../storages/admin.jpg");

    const payloadAddCar = {
      name: "Alphard",
      plate: "L 1234 AM",
      manufacture: "Toyota",
      model: "Bensin type G",
      year: 2022,
      price: "900.000.000",
      size: "medium",
      capacity: 6,
      image: filePath,
      description: "Lorem Ipsum",
      available: true,
      createdBy: "1",
    };

    const payloadCreateSuperAdmin = {
      name: "superadmin",
      email: "superadmin@example.com",
      password: hashedPassword,
      role: "superadmin",
      picture: filePath,
    };

    const createSuperAdmin = await usersRepository.register(payloadCreateSuperAdmin);

    const payloadLogin = {
      email: payloadCreateSuperAdmin.email,
      password: rawPassword,
    };

    const login = await authService.login(payloadLogin);

    return request(app)
      .post("/car/create")
      .set("Authorization", `Bearer ${login.data.token}`)
      .field("name", payloadAddCar.name)
      .field("plate", payloadAddCar.plate)
      .field("manufacture", payloadAddCar.manufacture)
      .field("model", payloadAddCar.model)
      .field("year", payloadAddCar.year)
      .field("price", payloadAddCar.price)
      .field("size", payloadAddCar.size)
      .field("capacity", payloadAddCar.capacity)
      .attach("image", payloadAddCar.image)
      .field("description", payloadAddCar.description)
      .field("available", payloadAddCar.available)
      .field("createdBy", payloadAddCar.createdBy)
      .then((res) => {
        console.log("res: ", res);
        expect(res.statusCode).toBe(201);
        expect(res._body.data).not.toEqual(null);

        // Delete Test Data
        carRepository.destroy({ id: res._body.data.id });
        usersRepository.deletedUserByID({ id: createSuperAdmin.id });
        server.close();
      });
  }, 60_000);
});

// 2. Get Cars
describe("GET /car", () => {
  it("should response with 200 as status code", async () => {
    const rawPassword = "qwerty123";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const payloadSuperAdmin = {
      name: "superadmin test",
      email: "superadmin@example.com",
      password: hashedPassword,
      role: "superadmin",
    };
    const createSuperAdmin = await usersRepository.register(payloadSuperAdmin);

    const payloadLogin = {
      email: payloadSuperAdmin.email,
      password: rawPassword,
    };

    const login = await authService.login(payloadLogin);

    return request(app)
      .get("/car")
      .set("Authorization", `Bearer ${login.data.token}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res._body.data).not.toEqual(null);

        usersRepository.deletedUserByID({ id: createSuperAdmin.id });
      });
  }, 60_000);
});

// 3. Get Cars By Id
describe("GET /cars/:id", () => {
  it("should response with 200 as status code", async () => {
    const payload = {
      name: "Grand Max",
      plate: "BM 1234 AM",
      manufacture: "Daihatsu",
      model: "Bensin type G",
      year: 2019,
      price: "Rp. 200.000.000",
      size: "medium",
      capacity: 6,
      image: filePath,
      description: "Lorem Ipsum",
      available: true,
      createdBy: "1",
    };

    const createCar = await carRepository.created(payload);
    console.log(createCar.id);

    const rawPassword = "qwerty123";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const payloadSuperAdmin = {
      name: "superadmin test",
      email: "superadmin@example.com",
      password: hashedPassword,
      role: "superadmin",
    };
    const createSuperAdmin = await usersRepository.register(payloadSuperAdmin);

    const payloadLogin = {
      email: payloadSuperAdmin.email,
      password: rawPassword,
    };

    const login = await authService.login(payloadLogin);

    return request(app)
      .get(`/cars/${createCar.id}`)
      .set("Authorization", `Bearer ${login.data.token}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res._body.data).not.toEqual(null);
        expect(createCar.name).toEqual(payload.name);
        expect(createCar.plate).toEqual(payload.plate);
        expect(createCar.manufacture).toEqual(payload.manufacture);
        expect(createCar.model).toEqual(payload.model);
        expect(createCar.year).toEqual(payload.year);
        expect(createCar.price).toEqual(payload.price);
        expect(createCar.size).toEqual(payload.size);
        expect(createCar.capacity).toEqual(payload.capacity);
        expect(createCar.image).toEqual(payload.image);
        expect(createCar.description).toEqual(payload.description);
        expect(createCar.available).toEqual(payload.available);
        expect(createCar.createdBy).toEqual(payload.createdBy);

        carRepository.destroy({ id: res._body.data.id });
        usersRepository.deletedUserByID({ id: createSuperAdmin.id });
      });
  }, 60_000);
});

// 4. Update Car PUT /car/id
describe("PUT /car/:id", () => {
  it("should response with 201 as status code", async () => {
    const filePath = path.join(__dirname, "../storages/admin.jpg");

    const payload = {
      name: "Grand Max",
      plate: "BM 1234 AM",
      manufacture: "Daihatsu",
      model: "Bensin type G",
      year: 2019,
      price: "Rp. 200.000.000",
      size: "medium",
      capacity: 6,
      image: filePath,
      description: "Lorem Ipsum",
      available: true,
      createdBy: "1",
    };

    const createCar = await carRepository.created(payload);

    const rawPassword = "qwerty123";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const payloadSuperAdmin = {
      name: "superadmin test",
      email: "superadmin@example.com",
      password: hashedPassword,
      role: "superadmin",
    };
    const createSuperAdmin = await userRepository.register(payloadSuperAdmin);

    const payloadLogin = {
      email: payloadSuperAdmin.email,
      password: rawPassword,
    };

    const login = await authService.login(payloadLogin);

    const payloadUpdate = {
      name: "Alphard",
      plate: "BM 1234 AM",
      manufacture: "Toyota",
      model: "Bensin type Luxury",
      year: 2022,
      price: "Rp. 900.000.000",
      size: "medium",
      capacity: 6,
      image: filePath,
      description: "Lorem Ipsum",
      available: true,
      updatedBy: "1",
    };
    return request(app)
      .put(`/car/${createCar.id}`)
      .set("Authorization", `Bearer ${login.data.token}`)
      .field("name", payloadUpdate.name)
      .field("plate", payloadUpdate.plate)
      .field("manufacture", payloadUpdate.manufacture)
      .field("model", payloadUpdate.model)
      .field("year", payloadUpdate.year)
      .field("price", payloadUpdate.price)
      .field("size", payloadUpdate.size)
      .field("capacity", payloadUpdate.capacity)
      .attach("image", payloadUpdate.image)
      .field("description", payloadUpdate.description)
      .field("available", payloadUpdate.available)
      .field("updatedBy", payloadUpdate.updatedBy)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res._body.data).not.toEqual(null);

        carRepository.destroy({ id: createCar.id });
        usersRepository.deletedUserByID({ id: createSuperAdmin.id });
      });
  }, 60_000);
});

// 5. DELETED CAR /car/:id
describe("DELETE /cars/:id", () => {
  it("should response with 201 as status code", async () => {
    const filePath = path.join(__dirname, "../storages/admin.jpg");
    const rawPassword = "qwerty123";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const payload = {
      name: "Grand Max",
      plate: "BM 1234 AM",
      manufacture: "Daihatsu",
      model: "Bensin type G",
      year: 2019,
      price: "Rp. 200.000.000",
      size: "medium",
      capacity: 6,
      image: filePath,
      description: "Lorem Ipsum",
      available: true,
      createdBy: "1",
    };

    const createCar = await carRepository.create(payload);

    const payloadSuperAdmin = {
      name: "superadmin test",
      email: "superadmin@example.com",
      password: hashedPassword,
      role: "superadmin",
    };
    const createSuperAdmin = await usersRepository.register(payloadSuperAdmin);

    const payloadLogin = {
      email: payloadSuperAdmin.email,
      password: rawPassword,
    };

    const login = await authService.login(payloadLogin);

    return request(app)
      .delete(`/cars/${createCar.id}`)
      .set("Authorization", `Bearer ${login.data.token}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res._body.data).not.toEqual(null);
        carRepository.destroy({ id: createCar.id });
        usersRepository.deletedUserByID({ id: createSuperAdmin.id });
      });
  }, 60_000);
});
