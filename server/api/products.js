const router = require('express').Router()
const { models: { Product, Cart_Item }} = require('../db')
module.exports = router

// GET api/products/
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({
        include: [Cart_Item]
    });
    res.json(products);
  } catch (err) {
    next(err)
  }
})

// GET api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id)
    res.json(product);
  } catch (err) {
    next(err)
  }
})
