"use strict";

const {
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
    Colorway,
    Inventory,
    Size,
  },
} = require("../server/db");

const { faker } = require("@faker-js/faker");

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  const seededUsers = [...Array(100)].map((user) => ({
    password: faker.internet.password(8),
    firstname: faker.name.firstName(),
    lastname: faker.name.lastName(),
    username: faker.internet.userName(),
    email: faker.internet.email(),
    phone_number: faker.phone.number(),
  }));

  const seededProductsWomen = [...Array(50)].map((product) => ({
    name: faker.commerce.product(8),
    description: faker.commerce.productDescription(),
    image: faker.image.abstract(),
    price: faker.commerce.price(),
    product_category: faker.commerce.department(),
    color_category: faker.color.human(),
    gender: "Women",
  }));
  const seededProductsMen = [...Array(50)].map((product) => ({
    name: faker.commerce.product(8),
    description: faker.commerce.productDescription(),
    image: faker.image.abstract(),
    price: faker.commerce.price(),
    product_category: faker.commerce.department(),
    color_category: faker.color.human(),
    gender: "Men",
  }));

  const allSeededProducts = [];
  allSeededProducts.push(...seededProductsMen);
  allSeededProducts.push(...seededProductsWomen);

  console.log(seededUsers);
  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");
  //*******START OF DEMO DATA */
  // Creating Users
  const users = await User.bulkCreate(seededUsers);
  const products = await Product.bulkCreate(allSeededProducts);

  const shippinginfos = await Promise.all([
    Shipping_Info.create({
      address1: "Avenue of Americas",
      city: "Manhattan",
      zipcode: "11373",
      country: "USA",
      userId: 1,
    }),
  ]);

  const paymentdemo = await Promise.all([
    Payment.create({
      payment_type: "visa",
      card_number: 42131,
      expiration: "8/26",
      userId: 1,
    }),
    Payment.create({
      payment_type: "MasterCard",
      card_number: 321412,
      expiration: "8/26",
      userId: 2,
    }),
  ]);

  const cartdemo = await Promise.all([Cart.create({ userId: 1 })]);

  const cartitemdemo = await Promise.all([
    Cart_Item.create({
      quantity: 1,
      productId: 1,
      cartId: 1,
    }),
    Cart_Item.create({
      quantity: 2,
      productId: 1,
      cartId: 1,
    }),
  ]);

  const orderSummaryDemo = await Promise.all([
    Order_Summary.create({ userId: 1 }),
  ]);

  const orderDetailsDemo = await Promise.all([
    Order_Detail.create({
      historic_price: 150.0,
      count: 2,
      ordersummaryId: 1,
      productId: 1,
    }),
  ]);

  const sizeDemo = await Promise.all([
    Size.create({ size: "M 6 / W 7.5" }),
    Size.create({ size: "M 6.5 / W 8" }),
    Size.create({ size: "M 7 / W 8.5" }),
    Size.create({ size: "M 7.5 / W 9" }),
    Size.create({ size: "M 8 / W 9.5" }),
    Size.create({ size: "M 8.5 / W 10" }),
    Size.create({ size: "M 9 / W 10.5" }),
    Size.create({ size: "M 9.5 / W 11" }),
    Size.create({ size: "M 10 / W 11.5" }),
    Size.create({ size: "M 10.5 / W 12" }),
    Size.create({ size: "M 11 / W 12.5" }),
    Size.create({ size: "M 11.5 / W 13" }),
    Size.create({ size: "M 12 / W 13.5" }),
    Size.create({ size: "M 12.5 / W 14" }),
    Size.create({ size: "M 13 / W 14.5" }),
    Size.create({ size: "M 14 / W 15.5" }),
    Size.create({ size: "M 15 / W 16.5" }),
    Size.create({ size: "M 16 / W 17.5" }),
    Size.create({ size: "M 17 / W 18.5" }),
    Size.create({ size: "M 18 / W 19.5" }),
  ]);

  const colorDemo = await Promise.all([
    Colorway.create({ color: "Black" }),
    Colorway.create({ color: "Blue" }),
    Colorway.create({ color: "White" }),
    Colorway.create({ color: "Red" }),
    Colorway.create({ color: "Grey" }),
  ]);

  // const sampleInventory = await Promise.all([ ])
  //TRIPLE FOR LOOP -- ONCE WE HAVE COLORWAY & Size Data;
  // FOR(let product# = 0; product.legth > product#; product#){}

  console.log(`seeded ${users.length} users`);
  console.log(`seeded ${products.length} products`);
  console.log(`seeded successfully`);
  return;
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
