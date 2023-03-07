const router = require("express").Router();
const {
  models: {User },
} = require("../db");

const Shipping_Info = require("../db/models/Shipping_Info");
module.exports = router;

//POST /api/shippinginfo/:userId
router.post("/:userId", async (req, res, next) => {
    try {
      const shippingAddress = await Shipping_Info.create({
        address1: req.body.address,
        city: req.body.city,
        state: req.body.state,
        zipcode: req.body.zipcode,
        country: 'USA'
      })
  
      const user = User.findByPk(req.params.userId);
      shippingAddress.setUser(user);
      res.status(201).json(shippingAddress);
    } catch (err) {
      next(err);
    }
  });