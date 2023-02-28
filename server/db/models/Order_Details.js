const Sequelize = require("sequelize");
const db = require("../db");

const Order_Detail = db.define("orderdetail", {
  count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
    allowNull: false,
  },
  //how do we implement historical price?
  historic_price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});

module.exports = Order_Detail;
