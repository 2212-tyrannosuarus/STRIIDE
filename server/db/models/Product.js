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
  },
  black_images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  white_images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  blue_images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  green_images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  pink_images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
  },
  purple_images: {
    type: Sequelize.ARRAY(Sequelize.STRING),
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
