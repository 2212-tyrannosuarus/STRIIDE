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
      const size = await Size.findOne({
        where: {
          size: req.headers.size
        }
      })

      const color = await Colorway.findOne({
        where: {
          color: req.headers.color
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

// PUT /api/inventory/:id
  router.put('/:id',  async (req, res, next) => {
    try {
      const size = await Size.findOne({
        where: {
          size: req.body.size
        }
      })

      let formattedColor = req.body.color[0].toUpperCase() + req.body.color.slice(1);

      const color = await Colorway.findOne({
        where: {
          color: formattedColor
        }
      })

      const item = await Inventory.findOne({
        where: {
          productId: req.params.id,
          colorwayId: color.id,
          sizeId: size.id
        }
      })

      let updatedCount = item.count - req.body.count;

      if (updatedCount < 0) updatedCount = 0;

      let updatedItem = await Inventory.update({count: updatedCount},{
        where: {
          productId: req.params.id,
          colorwayId: color.id,
          sizeId: size.id
        }
      })


      res.json(updatedItem)
    } catch (ex) {
      next(ex)
    }
  })