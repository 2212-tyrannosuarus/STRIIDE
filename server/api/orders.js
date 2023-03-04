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
      where: {
        userId: req.params.userId
      },
      include: [Order_Detail]
    });

    res.json(orders);
  } catch (err) {
    next(err);
  }
});

// POST api/orders/:id
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
        image: orderItems[item].imageUrl,
        name: orderItems[item].name
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
