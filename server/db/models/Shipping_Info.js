const Sequelize = require("sequelize");
const db = require("../db");

const Shipping_Info = db.define("shippinginfo", {
  address1: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  address2: {
    type: Sequelize.STRING,
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  zipcode: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Shipping_Info;
