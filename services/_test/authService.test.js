const authServices = require("../authServices");

// 1. Register
describe("register", () => {
  it("should create post to db", async () => {
    // Create payload
    const postToCreate = {
      name: "member 1",
      email: "member1@example.com",
      password: "qwerty123",
      role: "member",
    };

    // Expected Response
    const expectedCreatedUser = {
      id: 999,
      name: "member 1",
      email: "member1@example.com",
      password: "qwerty123",
      role: "member",
    };

    const expectedCreatedUserService = {
      status: true,
      status_code: 201,
      message: "Register Succesfully",
      data: {
        registered_user: expectedCreatedUser,
      },
    };

    // Create service mock function
    const mockAuthService = authServices;

    mockAuthService.register = jest.fn().mockImplementation(() => Promise.resolve(expectedCreatedUserService));

    const createdRegisterResponse = await mockAuthService.register(postToCreate);

    // Assertion
    expect(expectedCreatedUserService.status).toEqual(createdRegisterResponse.status);
    expect(expectedCreatedUserService.status_code).toEqual(createdRegisterResponse.status_code);
    expect(expectedCreatedUserService.message).toEqual(createdRegisterResponse.message);
    expect(expectedCreatedUserService.data.registered_user).toEqual(createdRegisterResponse.data.registered_user);
  });
});

// 2. Register Admin
describe("register admin", () => {
  it("should create post to db", async () => {
    // Create payload
    const postToCreate = {
      name: "admin 1",
      email: "admin1@example.com",
      password: "qwerty123",
    };

    // Expected Response
    const expectedCreatedUser = {
      id: 999,
      name: "admin 1",
      email: "admin1@example.com",
      password: "qwerty123",
    };

    const expectedCreatedUserService = {
      status: true,
      status_code: 201,
      message: "Register Admin Succesfully",
      data: {
        registered_user: expectedCreatedUser,
      },
    };

    // Create service mock function
    const mockAuthService = authServices;

    mockAuthService.registerAdmin = jest.fn().mockImplementation(() => Promise.resolve(expectedCreatedUserService));

    const createdRegisterAdminResponse = await mockAuthService.registerAdmin(postToCreate);

    // Assertion
    expect(expectedCreatedUserService.status).toEqual(createdRegisterAdminResponse.status);
    expect(expectedCreatedUserService.status_code).toEqual(createdRegisterAdminResponse.status_code);
    expect(expectedCreatedUserService.message).toEqual(createdRegisterAdminResponse.message);
    expect(expectedCreatedUserService.data.registered_user).toEqual(createdRegisterAdminResponse.data.registered_user);
  });
});

// 3. Login
describe("Login", () => {
  it("should create post to db", async () => {
    // Create payload
    const userLogin = {
      email: "testing@example.com",
      password: "qwerty123",
    };

    // Expected Response
    const expectedCreatedUser = {
      token: "qw9308490qwekmkdf012",
    };

    const expectedCreatedUserService = {
      status: true,
      status_code: 200,
      message: "User Successfully Logged in",
      data: {
        token: expectedCreatedUser,
      },
    };

    // Create service mock function
    const mockAuthService = authServices;

    mockAuthService.login = jest.fn().mockImplementation(() => Promise.resolve(expectedCreatedUserService));

    const createdLoginResponse = await mockAuthService.login(userLogin);

    // Assertion
    expect(expectedCreatedUserService.data.token).not.toEqual(null);
    expect(expectedCreatedUserService.status).toEqual(createdLoginResponse.status);
    expect(expectedCreatedUserService.status_code).toEqual(createdLoginResponse.status_code);
    expect(expectedCreatedUserService.message).toEqual(createdLoginResponse.message);
    expect(expectedCreatedUserService.data.registered_user).toEqual(createdLoginResponse.data.registered_user);
  });
});
