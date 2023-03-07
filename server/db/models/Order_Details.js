const Sequelize = require("sequelize");
const db = require("../db");

const Order_Detail = db.define("orderdetail", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  color: {
    type: Sequelize.STRING,
  },
  size: {
    type: Sequelize.STRING,
  },
  image: {
    type: Sequelize.STRING,
  },
  name: {
    type: Sequelize.STRING,
  },
  historic_price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = Order_Detail;
