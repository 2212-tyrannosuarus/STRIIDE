const Sequelize = require("sequelize");
const db = require("../db");
//unisex

const Size = db.define("size", {
  size: {
    type: Sequelize.STRING,
  },
});

module.exports = Size;
