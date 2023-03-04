const router = require("express").Router();
const {
  models: { Product, Cart_Item, Cart, User },
} = require("../db");
const Colorway = require("../db/models/Colorway");
const Inventory = require("../db/models/Inventory");
const Size = require("../db/models/Size");
module.exports = router;

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

  router.get('/user/me', async (req, res, next) => {
    try {
      console.log('req.headers.authorization ',req.headers.authorization)
      const user = await User.findByToken(req.headers.authorization)
      res.json(user.id)
    } catch (ex) {
      next(ex)
    }
  })

  router.get('/inventory/:id',  async (req, res, next) => {
    try {
      console.log('req.body ', req.body)
      const size = await Size.findOne({
        where: {
          size: req.body.size
        }
      })
      console.log('size ', size);

      const color = await Colorway.findOne({
        where: {
          color: req.body.color
        }
      })
      const item = await Inventory.findOne({
        where: {
          productId: req.params.id,
          colorwayId: color.id,
          sizeId: size.id
        }
      })
      res.json(item.count)
    } catch (ex) {
      next(ex)
    }
  })


