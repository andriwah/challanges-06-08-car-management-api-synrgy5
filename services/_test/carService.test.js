const carService = require("../carService");

// 1. Create Car / Add Car
describe("create car", () => {
  it("should create post to db", async () => {
    // Create payload
    const createCar = {
      name: "Grand Max",
      plate: "BM 1234 AM",
      manufacture: "Daihatsu",
      model: "Bensin type G",
      year: 2019,
      price: "Rp. 200.000.000",
      size: "medium",
      capacity: 6,
      image: "img.jpg",
      description: "Lorem Ipsum",
      available: true,
      createdBy: "1",
    };

    // Expected Response
    const expectedCreatedCar = {
      id: 999,
      name: "Grand Max",
      plate: "BM 1234 AM",
      manufacture: "Daihatsu",
      model: "Bensin type G",
      year: 2019,
      price: "Rp. 200.000.000",
      size: "medium",
      capacity: 6,
      image: "img.jpg",
      description: "Lorem Ipsum",
      available: true,
      createdBy: "1",
    };

    const expectedCreatedCarService = {
      status: true,
      status_code: 201,
      message: "Product Created",
      data: {
        expectedCreatedCar,
      },
    };

    // Create service mock function
    const mockCarService = carService;

    mockCarService.created = jest.fn().mockImplementation(() => Promise.resolve(expectedCreatedCarService));

    const createdCarResponse = await mockCarService.created(createCar);

    // Assertion
    expect(expectedCreatedCarService.status).toEqual(createdCarResponse.status);
    expect(expectedCreatedCarService.status_code).toEqual(createdCarResponse.status_code);
    expect(expectedCreatedCarService.message).toEqual(createdCarResponse.message);
    expect(expectedCreatedCarService.data).toEqual(createdCarResponse.data);
  });
});

// 2. Get Car By Id
describe("Get Car By Id", () => {
  it("should create post to db", async () => {
    // Payload Id Car
    const payloadIdCar = { id: 999 };

    // Expected Response
    const expectedGetCar = {
      id: 999,
      name: "Grand Max",
      plate: "BM 1234 AM",
      manufacture: "Daihatsu",
      model: "Bensin type G",
      year: 2019,
      price: "Rp. 200.000.000",
      size: "medium",
      capacity: 6,
      image: "img.jpg",
      description: "Lorem Ipsum",
      available: true,
      createdBy: "1",
    };

    const expectedCreatedCarService = {
      status: true,
      status_code: 200,
      message: "Succesfully",
      data: {
        expectedGetCar,
      },
    };

    // Create service mock function
    const mockCarService = carService;

    mockCarService.getCarById = jest.fn().mockImplementation(() => Promise.resolve(expectedCreatedCarService));

    const getAllCarResponse = await mockCarService.getCarById(payloadIdCar);

    // Assertion
    expect(expectedCreatedCarService.status).toEqual(getAllCarResponse.status);
    expect(expectedCreatedCarService.status_code).toEqual(getAllCarResponse.status_code);
    expect(expectedCreatedCarService.message).toEqual(getAllCarResponse.message);
    expect(expectedCreatedCarService.data).toEqual(getAllCarResponse.data);
  });
});

// 3. Updated Car
describe("Update Car", () => {
  it("should create post to db", async () => {
    // Create payload
    const payloadCar = {
      id: 999,
      name: "Grand Max",
      plate: "BM 1234 AM",
      manufacture: "Daihatsu",
      model: "Bensin type G",
      year: 2019,
      price: "Rp. 200.000.000",
      size: "medium",
      capacity: 6,
      image: "img.jpg",
      description: "Lorem Ipsum",
      available: true,
      createdBy: "1",
    };
    // Expected Response
    const expecteUpdateCar = {
      id: 999,
    };

    const expectedUpdateCarService = {
      status: true,
      status_code: 200,
      message: "Update car success",
      data: [expecteUpdateCar.id],
    };

    // Create service mock function
    const mockCarService = carService;

    mockCarService.updated = jest.fn().mockImplementation(() => Promise.resolve(expectedUpdateCarService));

    const updateCarResponse = await mockCarService.updated(payloadCar);

    // Assertion
    expect(expectedUpdateCarService.status).toEqual(updateCarResponse.status);
    expect(expectedUpdateCarService.status_code).toEqual(updateCarResponse.status_code);
    expect(expectedUpdateCarService.message).toEqual(updateCarResponse.message);
    expect(expectedUpdateCarService.data).toEqual(updateCarResponse.data);
  });
});

// 4. Deleted Car
describe("Delete car", () => {
  it("should create post to db", async () => {
    // Create payload
    const whoIsUserCreated = 1;
    const payloadCar = {
      id: 999,
      deletedBy: whoIsUserCreated,
    };
    // Expected Response
    const expecteDeletedCar = {
      id: 999,
    };

    const expectedDeleteCarService = {
      status: true,
      status_code: 200,
      message: "car deleted",
      data: [expecteDeletedCar.id],
    };

    // Create service mock function
    const mockCarService = carService;

    mockCarService.deleted = jest.fn().mockImplementation(() => Promise.resolve(expectedDeleteCarService));

    const updateCarResponse = await mockCarService.deleted(payloadCar);

    // Assertion
    expect(expectedDeleteCarService.status).toEqual(updateCarResponse.status);
    expect(expectedDeleteCarService.status_code).toEqual(updateCarResponse.status_code);
    expect(expectedDeleteCarService.message).toEqual(updateCarResponse.message);
    expect(expectedDeleteCarService.data).toEqual(updateCarResponse.data);
  });
});
