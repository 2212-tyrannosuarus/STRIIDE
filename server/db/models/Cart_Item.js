const Sequelize = require("sequelize");
const db = require("../db");

const Cart_Item = db.define("cartitem", {
  quantity: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Cart_Item;
