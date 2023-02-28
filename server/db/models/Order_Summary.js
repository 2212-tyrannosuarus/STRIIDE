const Sequelize = require("sequelize");
const db = require("../db");

const Order_Summary = db.define("ordersummary", {
  total_price: {
    type: Sequelize.FLOAT,
  },
});

module.exports = Order_Summary;
