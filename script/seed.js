"use strict";

const { shoes } = require("./shoes");
const { sizes } = require("./sizes");

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

  await db.sync({ force: true }); // clears db and matches models to tables
  console.log("db synced!");
  //*******START OF DEMO DATA */
  // Creating Users
  const users = await User.bulkCreate(seededUsers);
  const products = await Product.bulkCreate(shoes);
  console.log("product ========================", products[0]);

  const sizeDemo = await Size.bulkCreate(sizes);

  const colorDemo = await Promise.all([
    Colorway.create({ color: "Black" }),
    Colorway.create({ color: "White" }),
    Colorway.create({ color: "Blue" }),
    Colorway.create({ color: "Green" }),
    Colorway.create({ color: "Pink" }),
    Colorway.create({ color: "Purple" }),
  ]);

  const seededInventory = products.forEach(async (shoe) => {
    if (shoe.black_images.length > 0) {
      for (let i = 0; i < sizes.length; i++) {
        let item = await Inventory.create({
          count: 20,
          productId: shoe.id,
          sizeId: i + 1,
          colorwayId: 1,
        });
      }
    }
    if (shoe.white_images.length > 0) {
      for (let i = 0; i < sizes.length; i++) {
        let item = await Inventory.create({
          count: 20,
          productId: shoe.id,
          sizeId: i + 1,
          colorwayId: 2,
        });
      }
    }
    if (shoe.blue_images.length > 0) {
      for (let i = 0; i < sizes.length; i++) {
        let item = await Inventory.create({
          count: 20,
          productId: shoe.id,
          sizeId: i + 1,
          colorwayId: 3,
        });
      }
    }
    if (shoe.green_images.length > 0) {
      for (let i = 0; i < sizes.length; i++) {
        let item = await Inventory.create({
          count: 20,
          productId: shoe.id,
          sizeId: i + 1,
          colorwayId: 4,
        });
      }
    }
    if (shoe.pink_images.length > 0) {
      for (let i = 0; i < sizes.length; i++) {
        let item = await Inventory.create({
          count: 20,
          productId: shoe.id,
          sizeId: i + 1,
          colorwayId: 5,
        });
      }
    }
    if (shoe.purple_images.length > 0) {
      for (let i = 0; i < sizes.length; i++) {
        let item = await Inventory.create({
          count: 20,
          productId: shoe.id,
          sizeId: i + 1,
          colorwayId: 6,
        });
      }
    }
  });

  // const inventory = await Inventory.bulkCreate(seededInventory);

  const realUsers = await Promise.all([
    User.create({
      password: "tasneemPass",
      firstname: "Tasneem",
      lastname: "Patrawala",
      username: "tasneem.patrawala",
      email: "tasneemp_sa@yahoo.com",
      phone_number: faker.phone.number(),
    }),
    User.create({
      password: "miroPass",
      firstname: "Miro",
      lastname: "Malebranche",
      username: "miro.malebranche",
      email: "miro.maleb@gmail.com",
      phone_number: faker.phone.number(),
    }),
  ]);

  const shippinginfos = await Promise.all([
    Shipping_Info.create({
      address1: "Avenue of Americas",
      city: "Manhattan",
      state: "New York",
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
  let orderSummaryArr = [];
  for (let i = 1; i < 10; i++) {
    orderSummaryArr.push(Order_Summary.create({ userId: i }));
  }
  const orderSummaryDemo = await Promise.all(orderSummaryArr);

  const orderDetailsDemo = await Promise.all([
    Order_Detail.create({
      historic_price: 150.0,
      count: 2,
      color: "white",
      size: "M 6 / W 7.5",
      ordersummaryId: 1,
      productId: 1,
    }),
    Order_Detail.create({
      historic_price: 150.0,
      count: 2,
      color: "black",
      size: "M 7 / W 8.5",
      ordersummaryId: 2,
      productId: 2,
    }),
    Order_Detail.create({
      historic_price: 150.0,
      count: 2,
      color: "purple",
      size: "M 7 / W 8.5",
      ordersummaryId: 3,
      productId: 3,
    }),
    Order_Detail.create({
      historic_price: 150.0,
      count: 2,
      color: "white",
      size: "M 8 / W 9.5",
      ordersummaryId: 4,
      productId: 4,
    }),
    Order_Detail.create({
      historic_price: 150.0,
      count: 2,
      color: "black",
      size: "M 10 / W 11.5",
      ordersummaryId: 5,
      productId: 5,
    }),
    Order_Detail.create({
      historic_price: 150.0,
      count: 2,
      color: "blue",
      size: "M 12 / W 13.5",
      ordersummaryId: 6,
      productId: 6,
    }),
    Order_Detail.create({
      historic_price: 150.0,
      count: 2,
      color: "green",
      size: "M 15 / W 16.5",
      ordersummaryId: 7,
      productId: 7,
    }),
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
