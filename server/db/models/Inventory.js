const Sequelize = require("sequelize");
const db = require("../db");

const Inventory = db.define("inventory", {
  count: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
});

module.exports = Inventory;
