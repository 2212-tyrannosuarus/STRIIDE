const router = require("express").Router();
const {
  models: { Product, Cart_Item, Cart, User },
} = require("../db");
const Colorway = require("../db/models/Colorway");
const Inventory = require("../db/models/Inventory");
const Size = require("../db/models/Size");
module.exports = router;

//GET /api/inventory/:id
router.get('/:id',  async (req, res, next) => {
    try {
    //   console.log('req.headers ', req.headers)
      const size = await Size.findOne({
        where: {
          size: req.headers.size
        }
      })
    //   console.log('size ', size);

      const color = await Colorway.findOne({
        where: {
          color: req.headers.color
        }
      })

    //   console.log('color ', color);

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