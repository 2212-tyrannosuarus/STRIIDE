const Sequelize = require("sequelize");
const db = require("../db");

const Cart_Item = db.define("cartitem", {
  quantity: {
    type: Sequelize.INTEGER,
  },
  size: {
    type: Sequelize.INTEGER,
  },
  color: {
    type: Sequelize.STRING,
  },
});

module.exports = Cart_Item;
