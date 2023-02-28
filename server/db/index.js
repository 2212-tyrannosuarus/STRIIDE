//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Order_Detail = require("./models/Order_Details");
const Order_Summary = require("./models/Order_Summary");
const Cart = require("./models/Cart");
const Cart_Item = require("./models/Cart_Item");
const Shipping_Info = require("./models/Shipping_Info");
const Payment = require("./models/Payment");
const Product = require("./models/Product");
const Inventory = require("./models/Inventory");
const Colorway = require("./models/Colorway");
const Size = require("./models/Size");

//associations could go here!

User.hasMany(Shipping_Info);
Shipping_Info.belongsTo(User);

User.hasMany(Payment);
Payment.belongsTo(User);

User.hasOne(Cart);
Cart.belongsTo(User);

User.hasMany(Order_Summary);
Order_Summary.belongsTo(User);

Order_Summary.hasMany(Order_Detail);
Order_Detail.belongsTo(Order_Summary);

Cart.hasMany(Cart_Item);
Cart_Item.belongsTo(Cart);

Product.hasOne(Cart_Item);
Cart_Item.belongsTo(Product);

Product.hasOne(Order_Detail);
Order_Detail.belongsTo(Product);

Product.hasOne(Inventory);
Inventory.belongsTo(Product);

Size.hasOne(Inventory);
Inventory.belongsTo(Size);

Colorway.hasOne(Inventory);
Inventory.belongsTo(Size);

// Product.belongsToMany(Size, {
//   through: "product_size",
//   foreignKey: Product.id,
// });

// Size.belongsToMany(Product, { through: "product_size", foreignKey: Size.id });

module.exports = {
  db,
  models: {
    User,
    Order_Detail,
    Cart,
    Cart_Item,
    Shipping_Info,
    Payment,
    Product,
    Order_Summary,
    Inventory,
    Colorway,
    Size,
  },
};
