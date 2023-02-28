const Sequelize = require("sequelize");
const db = require("../db");

const Cart = db.define("cart", {
  total: {
    type: Sequelize.FLOAT,
    defaultValue: 0,
  },
});

module.exports = Cart;
