const router = require("express").Router();
const {
  models: { Product, Cart_Item, Cart, User },
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
            userId: req.params.userId,
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

    // POST api/carts/:id
router.post("/:userId", async (req, res, next) => {
    try {
        const {total, cartItems} = req.body;
      const newCart = await Cart.create({total: total});
    //   console.log('newCartItems ',cartItems);
      const user = await User.findByPk(req.params.userId);
      newCart.setUser(user);

      for (let item in cartItems) {
        console.log('item ', item)
        let newItem = await Cart_Item.create({quantity: cartItems[item].quantity, size: cartItems[item].size, color: cartItems[item].color});
        let product = await Product.findByPk(cartItems[item].id);
        newItem.setCart(newCart);
        newItem.setProduct(product)
      }
      res.status(201).json(newCart);
    } catch (err) {
      next(err);
    }
  });

  // DELETE api/carts/:id
router.delete("/:userId", async (req, res, next) => {
    try {
      const cart = await Cart.findOne({
        where: {
          userId: req.params.userId
        }
      })
      await cart.destroy();
      const cartItems = await Cart_Item.findAll({
        where: {
            cartId: null
        }
      })

      for (let item of cartItems) {
        await item.destroy();
      }
      res.json(cart);
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


