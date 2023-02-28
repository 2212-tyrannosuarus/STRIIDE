const Sequelize = require("sequelize");
const db = require("../db");

const Payment = db.define("payment", {
  payment_type: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  card_number: {
    type: Sequelize.INTEGER,
    allowNull: false,
    // validate: {
    //   isCreditCard: true,
    // },
  },
  expiration: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = Payment;
