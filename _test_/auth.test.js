const request = require("supertest");
const { app, server } = require("../server");
const bcrypt = require("bcrypt");
const path = require("path");
const usersRepository = require("../repositories/userRepository");
const authService = require("../services/authServices");

beforeEach(async () => {
  console.log("auth");
  await server.close();
});

// 1. Login
describe("POST /auth/login", () => {
  it("should response with 200 as status code", async () => {
    const rawPassword = "qwerty123";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const filePath = path.join(__dirname, "../storages/admin.jpg");

    const payloadCreateUser = {
      name: "member 1",
      email: "member1@example.com",
      password: hashedPassword,
      role: "member",
      picture: filePath,
    };

    const createdUser = await usersRepository.register(payloadCreateUser);

    const payloadLogin = {
      email: payloadCreateUser.email,
      password: rawPassword,
    };

    return request(app)
      .post("/auth/login")
      .send(payloadLogin)
      .set("Content-Type", "application/json")
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res._body.data.token).not.toEqual(null);

        usersRepository.deletedUserByID({ id: createdUser.id });
        server.close();
      });
  }, 60_000);
});

// 2. Register
describe("POST /auth/register", () => {
  it("should response with 201 as status code", async () => {
    const filePath = path.join(__dirname, "../storages/admin.jpg");

    const payloadRegisterUser = {
      name: "member 1",
      email: "member1@example.com",
      password: "qwerty123",
      picture: filePath,
    };

    return request(app)
      .post("/auth/register")
      .field("name", payloadRegisterUser.name)
      .field("email", payloadRegisterUser.email)
      .field("password", payloadRegisterUser.password)
      .attach("picture", payloadRegisterUser.picture)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res._body.data.registered_user).not.toEqual(null);

        // Deleted Test Data
        usersRepository.deletedUserByID({ id: res._body.data.registered_user.id });
      });
  });
});

// 3. Current User
describe("GET /auth/me", () => {
  it("should response with 200 as status code", async () => {
    const rawPassword = "qwerty123";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);
    const filePath = path.join(__dirname, "../storages/admin.jpg");

    const payloadCreateUser = {
      name: "member1",
      email: "member18@example.com",
      password: hashedPassword,
      role: "member",
      picture: filePath,
    };

    const createdUser = await usersRepository.register(payloadCreateUser);

    const payloadLogin = {
      email: payloadCreateUser.email,
      password: rawPassword,
    };

    const login = await authService.login(payloadLogin);

    return request(app)
      .get("/auth/me")
      .set("Authorization", `Bearer ${login.data.token}`)
      .then((res) => {
        expect(res.statusCode).toBe(200);

        usersRepository.deletedUserByID({ id: createdUser.id });
        server.close();
      });
  }, 60_000);
});

// 4. Register Admin
describe("POST /auth/register/admin", () => {
  it("should response with 201 as status code", async () => {
    const filePath = path.join(__dirname, "../storages/admin.jpg");
    const rawPassword = "qwerty123";
    const hashedPassword = await bcrypt.hash(rawPassword, 10);

    const payloadRegisterAdmin = {
      name: "admin 1",
      email: "admin1@example.com",
      password: "admin1234",
      picture: filePath,
      role: "admin",
    };

    const payloadSuperAdmin = {
      name: "superadmin testing",
      email: "superadmin@example.com",
      password: hashedPassword,
      picture: filePath,
      role: "superadmin",
    };
    const createSuperAdmin = await usersRepository.register(payloadSuperAdmin);

    const payloadLoginSuperAdmin = {
      email: payloadSuperAdmin.email,
      password: rawPassword,
    };

    const login = await authService.login(payloadLoginSuperAdmin);

    return request(app)
      .post("/auth/register/admin")
      .set("Authorization", `Bearer ${login.data.token}`)
      .field("name", payloadRegisterAdmin.name)
      .field("email", payloadRegisterAdmin.email)
      .field("password", payloadRegisterAdmin.password)
      .field("role", payloadRegisterAdmin.role)
      .attach("picture", payloadRegisterAdmin.picture)
      .then((res) => {
        expect(res.statusCode).toBe(201);
        expect(res._body.data.registered_user).not.toEqual(null);

        // Delete Test Data
        usersRepository.deletedUserByID({ id: res._body.data.registered_user.id });
        usersRepository.deletedUserByID({ id: createSuperAdmin.id });
      });
  }, 60_000);
});
