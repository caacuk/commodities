const Sequelize = require("sequelize");
require("dotenv/config");
const db = {};
const stringConnection =
  "postgres://nelbgfvhugqhgv:eee0e1693abad87019c44deb2f61d4a3fadb78b5490bd441b47933079adadba8@ec2-54-197-254-117.compute-1.amazonaws.com:5432/d74b4uajbmmr62";

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
