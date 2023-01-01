const carRepository = require('../carRepository');

// 1. test created car
describe('create car', () => {
  it('should create car to db', async () => {
    const payloadAddCar = {
      name: 'Grand Max',
      plate: 'BM 1234 AM',
      manufacture: 'Daihatsu',
      model: 'Bensin type G',
      year: 2019,
      price: 'Rp. 200.000.000',
      size: 'medium',
      capacity: 6,
      image: 'img.jpg',
      description: 'Lorem Ipsum',
      available: true,
      createdBy: '1',
    };

    const createdCar = await carRepository.created(payloadAddCar);

    // -- assertion --
    expect(createdCar).not.toEqual(null);
    expect(createdCar.name).toEqual(payloadAddCar.name);
    expect(createdCar.plate).toEqual(payloadAddCar.plate);
    expect(createdCar.manufacture).toEqual(payloadAddCar.manufacture);
    expect(createdCar.model).toEqual(payloadAddCar.model);
    expect(createdCar.year).toEqual(payloadAddCar.year);
    expect(createdCar.price).toEqual(payloadAddCar.price);
    expect(createdCar.size).toEqual(payloadAddCar.size);
    expect(createdCar.capacity).toEqual(payloadAddCar.capacity);
    expect(createdCar.image).toEqual(payloadAddCar.image);
    expect(createdCar.description).toEqual(payloadAddCar.description);
    expect(createdCar.available).toEqual(payloadAddCar.available);
    expect(createdCar.createdBy).toEqual(payloadAddCar.createdBy);

    // -- deleted data --
    carRepository.destroy({ id: createdCar.id });
  });
});

// 2. test get car by name
describe('Get Car By Name', () => {
  it('should create car to db', async () => {
    const payloadAddCar = {
      name: 'Grand Max',
      plate: 'BM 1234 AM',
      manufacture: 'Daihatsu',
      model: 'Bensin type G',
      year: 2019,
      price: 'Rp. 200.000.000',
      size: 'medium',
      capacity: 6,
      image: 'img.jpg',
      description: 'Lorem Ipsum',
      available: true,
      createdBy: '1',
    };

    const createdCar = await carRepository.created(payloadAddCar);

    const getCarByName = await carRepository.getCarByName({ name: createdCar.name });

    // -- assertion --
    expect(getCarByName).not.toEqual(null);
    expect(getCarByName.name).toEqual(createdCar.name);

    // -- deleted data --
    carRepository.destroy({ id: createdCar.id });
  });
});

// 3. test get by id
describe('Get Car By Id', () => {
  it('should create car to db', async () => {
    const payloadAddCar = {
      name: 'Grand Max',
      plate: 'BM 1234 AM',
      manufacture: 'Daihatsu',
      model: 'Bensin type G',
      year: 2019,
      price: 'Rp. 200.000.000',
      size: 'medium',
      capacity: 6,
      image: 'img.jpg',
      description: 'Lorem Ipsum',
      available: true,
      createdBy: '1',
    };

    const createdCar = await carRepository.created(payloadAddCar);

    const getCarById = await carRepository.getById({ id: createdCar.id });

    // -- assertion --
    expect(getCarById).not.toEqual(null);
    expect(createdCar.name).toEqual(payloadAddCar.name);
    expect(createdCar.plate).toEqual(payloadAddCar.plate);
    expect(createdCar.manufacture).toEqual(payloadAddCar.manufacture);
    expect(createdCar.model).toEqual(payloadAddCar.model);
    expect(createdCar.year).toEqual(payloadAddCar.year);
    expect(createdCar.price).toEqual(payloadAddCar.price);
    expect(createdCar.size).toEqual(payloadAddCar.size);
    expect(createdCar.capacity).toEqual(payloadAddCar.capacity);
    expect(createdCar.image).toEqual(payloadAddCar.image);
    expect(createdCar.description).toEqual(payloadAddCar.description);
    expect(createdCar.available).toEqual(payloadAddCar.available);
    expect(createdCar.createdBy).toEqual(payloadAddCar.createdBy);

    // -- deleted data --
    carRepository.destroy({ id: createdCar.id });
  });
});

// 4. test updated car
describe('updateByID', () => {
  it('should create car to db', async () => {
    const payloadAddCar = {
      name: 'Grand Max',
      plate: 'BM 1234 AM',
      manufacture: 'Daihatsu',
      model: 'Bensin type G',
      year: 2019,
      price: 'Rp. 200.000.000',
      size: 'medium',
      capacity: 6,
      image: 'img.jpg',
      description: 'Lorem Ipsum',
      available: true,
      createdBy: '1',
    };

    const createdCar = await carRepository.created(payloadAddCar);

    const carToUpdate = {
      id: createdCar.id,
      nname: 'Alphard',
      plate: 'L 1234 AM',
      manufacture: 'Toyota',
      model: 'Diesel type V',
      year: 2018,
      price: 'Rp. 400.000.000',
      size: 'medium',
      capacity: 6,
      image: 'img.jpg',
      description: 'Lorem Ipsum',
      available: false,
      updatedBy: '1',
    };

    const updatedCar = await carRepository.updated(carToUpdate);

    // -- assertion --
    expect(updatedCar).not.toEqual(null);

    // -- deleted data test --
    carRepository.destroy({ id: createdCar.id });
  });
});

// 5. test deleted car
describe('deleteById', () => {
  it('should create user to db', async () => {
    const payloadAddCar = {
      name: 'Grand Max',
      plate: 'BM 1234 AM',
      manufacture: 'Daihatsu',
      model: 'Bensin type G',
      year: 2019,
      price: 'Rp. 200.000.000',
      size: 'medium',
      capacity: 6,
      image: 'img.jpg',
      description: 'Lorem Ipsum',
      available: true,
      createdBy: '1',
      deletedBy: '',
      deletedAt: '',
    };

    const createdCar = await carRepository.created(payloadAddCar);

    const deletedCarsById = await carRepository.deleted({
      id: createdCar.id,
      deletedBy: 1,
      deletedAt: new Date().getTime(),
    });

    // Assertation
    expect(deletedCarsById).not.toEqual(null);

    // -- deleted data test --
    carRepository.destroy({ id: createdCar.id });
  });
});
