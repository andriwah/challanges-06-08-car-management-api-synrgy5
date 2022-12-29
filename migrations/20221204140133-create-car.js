'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Cars', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
      },
      plate: {
        type: Sequelize.STRING,
      },
      manufacture: {
        type: Sequelize.STRING,
      },
      model: {
        type: Sequelize.STRING,
      },
      year: {
        type: Sequelize.INTEGER,
      },
      price: {
        type: Sequelize.STRING,
      },
      size: {
        type: Sequelize.ENUM('small', 'medium', 'large'),
      },
      capacity: {
        type: Sequelize.INTEGER,
      },
      description: {
        type: Sequelize.STRING,
      },
      image: {
        type: Sequelize.TEXT,
      },
      available: {
        type: Sequelize.BOOLEAN,
      },
      createdBy: {
        type: Sequelize.STRING,
      },
      updatedBy: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      deletedBy: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Cars');
  },
};
