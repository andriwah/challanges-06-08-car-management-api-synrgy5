'use strict';

require('dotenv').config();
const bcrypt = require('bcrypt');
const { ROLES } = require('../lib/const');
const SALT_ROUND = 10;

module.exports = {
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash(process.env.SUPERADMIN_PASSWORD, SALT_ROUND);
    await queryInterface.bulkInsert('Users', [
      {
        name: 'Super Admin',
        email: 'superadmin@example.com',
        password: hashedPassword,
        role: ROLES.SUPERADMIN,
        picture: null,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
