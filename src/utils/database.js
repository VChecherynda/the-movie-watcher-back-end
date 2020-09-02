const Sequelize = require("sequelize");
const dotenv = require("dotenv");
dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    // gimme postgres, please!
    dialect: process.env.DB_DIALECT,
    host: process.env.DB_HOST,
    logging: false,
    port: 5432
  }
);

module.exports = sequelize;
