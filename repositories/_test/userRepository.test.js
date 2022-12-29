const userRepository = require('../userRepository');
const path = require('path');

// 1. register user test
describe('register app', () => {
  it('Should regiser post to db', async () => {
    const filePath = path.join(__dirname, '../../storages/admin.jpg');
    const payloadRegister = {
      name: 'andri wahyudi',
      email: 'andri@example.com',
      password: 'qwerty123',
      role: 'member',
      picture: filePath,
    };

    const testRegister = await userRepository.register(payloadRegister);

    // assertion

    expect(testRegister.name).toEqual(payloadRegister.name);
    expect(testRegister.email).toEqual(payloadRegister.email);
    expect(testRegister.password).toEqual(payloadRegister.password);
    expect(testRegister.role).toEqual(payloadRegister.role);
    expect(testRegister.picture).toEqual(payloadRegister.picture);

    // delete test data

    await userRepository.deletedUserByID({ id: testRegister.id });
  });
});

// 2.  Test Get By email
