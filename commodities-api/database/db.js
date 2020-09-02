const Sequelize = require("sequelize");
require("dotenv/config");
const db = {};

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  timezone: "Asia/Jakarta",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
