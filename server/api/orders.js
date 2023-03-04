const router = require("express").Router();
const {
  models: { Product, Cart_Item, Cart, User },
} = require("../db");
const Order_Detail = require("../db/models/Order_Details");
const Order_Summary = require("../db/models/Order_Summary");
module.exports = router;

//GET api/orders/:userId
router.get("/:userId", async (req, res, next) => {
  try {
    const orders = await Order_Summary.findAll({
      include: [Order_Detail]
    });
    // console.log('orders.length', orders.length)
    // orders[0]["orderdetails"]["productId"]
    // for (let i = 0; i < orders.length; i++) {
    //     // console.log('orders[i].orderdetails',orders[i].orderdetails)
    //     for (let j = 0; j < orders[i].orderdetails.length; j++) {
    //         let productid = orders[i].orderdetails[j].productId;
    //         let product = await Product.findByPk(productid);
    //         console.log('product ', product.image);
    //         Object.defineProperty(orders[i].orderdetails[j], 'imageUrl', {
    //             value: product.image
    //         });
    //         // orders[i].orderdetails[j].imageUrl = product.image;
    //         console.log('orders[i].orderdetails[j] ', orders[i].orderdetails[j]);
    //     }
    // }
   
   
    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// POST api/carts/:id
router.post("/:userId", async (req, res, next) => {
  try {
    const { total, orderItems } = req.body;
    const newOrder = await Order_Summary.create({ total_price: total });
    //   console.log('newCartItems ',cartItems);
    const user = await User.findByPk(req.params.userId);
    newOrder.setUser(user);

    for (let item in orderItems) {
      console.log("item ", item);
      let newOrderItem = await Order_Detail.create({
        historic_price: total,
        quantity: orderItems[item].quantity,
        size: orderItems[item].size,
        color: orderItems[item].color,
        image: orderItems[item].imageUrl
      });
      let product = await Product.findByPk(orderItems[item].id);
      newOrderItem.setOrdersummary(newOrder);
      newOrderItem.setProduct(product);
    }
    res.status(201).json(newOrder);
  } catch (err) {
    next(err);
  }
});

// router.post("/", async (req, res, next) => {
//   try {
//     res.status(201).send(await Product.create(req.body));
//   } catch (e) {
//     next(e);
//   }
// });
