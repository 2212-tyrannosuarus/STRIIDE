const router = require("express").Router();
const {
  models: { Product, Cart_Item, Cart },
} = require("../db");
module.exports = router;

// GET api/carts/
// router.get("/", async (req, res, next) => {
//   try {
//     const products = await Product.findAll({
//       include: [Cart_Item],
//     });
//     res.json(products);
//   } catch (err) {
//     next(err);
//   }
// });

// GET api/carts/:id
router.get("/:userId", async (req, res, next) => {
    try {
      const cart = await Cart.findOne({
        where: {
            id: req.params.userId,
        },
        include: [Cart_Item]
      });
      let cartItems = []
      for (let item of cart.cartitems) {
        let product = await Product.findByPk(item.productId);
        let cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            color: item.color,
            size: item.size,
            quantity: item.quantity
        }
        cartItems.push(cartItem)
      }
      
      res.json(cartItems);
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


