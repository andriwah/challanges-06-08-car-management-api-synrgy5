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

// -- assertion --

// -- deleted data --

// 3. test get car query params

// -- assertion --

// -- deleted data --

// 4. test get by id

// -- assertion --

// -- deleted data --

// 5. test updated car

// -- assertion --

// -- deleted data --

// 6. test deleted car

// -- assertion --

// -- deleted data --
