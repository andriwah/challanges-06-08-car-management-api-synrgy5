require('dotenv').config();
module.exports = {
  development: {
    username: process.env.NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT_DB,
    dialect: 'postgres',
  },
  test: {
    username: process.env.NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT_DB,
    dialect: 'postgres',
  },
  production: {
    username: process.env.NAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    host: process.env.HOST,
    port: process.env.PORT_DB,
    dialect: 'postgres',
  },
};
