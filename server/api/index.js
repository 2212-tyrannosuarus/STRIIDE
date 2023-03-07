const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'));
router.use('/products', require('./products'));
router.use('/carts', require('./carts'));
router.use('/orders', require('./orders'));
router.use('/inventory', require('./inventory'));
router.use('/shippinginfo', require('./shippingInfo'));
router.use('/paymentmethod', require('./paymentmethod'));

router.use("/users", require("./users"));
router.use("/products", require("./products"));
router.use("/carts", require("./carts"));
router.use("/orders", require("./orders"));
router.use("/inventory", require("./inventory"));
router.use("/shippinginfo", require("./shippingInfo"));
router.use("/paymentmethod", require("./paymentmethod"));

router.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
