const Sequelize = require("sequelize");
const db = require("../db");

const Product = db.define("product", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
  },
  image: {
    type: Sequelize.TEXT,
    defaultValue:
      "http://wandw.wdfiles.com/local--files/location:hogwarts-castle/Campus.jpg",
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
  product_category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  color_category: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  gender: {
    type: Sequelize.ENUM,
    values: ["Men", "Women"],
  },
});

module.exports = Product;
