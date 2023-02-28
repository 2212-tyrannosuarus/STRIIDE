const Sequelize = require("sequelize");
const db = require("../db");

const Colorway = db.define("colorway", {
  color: {
    type: Sequelize.STRING,
  },
});

module.exports = Colorway;
