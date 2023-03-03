const Sequelize = require("sequelize");
const db = require("../db");

const Cart_Item = db.define("cartitem", {
  quantity: {
    type: Sequelize.INTEGER,
  },
  size: {
    type: Sequelize.STRING,
  },
  color: {
    type: Sequelize.STRING,
  },
});

module.exports = Cart_Item;
