// const router = require('express').Router()
// const { models: { Product }} = require('../db')
// module.exports = router

// // GET api/products/
// router.get('/', async (req, res, next) => {
//   try {
//     const products = await Product.findAll({
//       // explicitly select only the id and username fields - even though
//       // users' passwords are encrypted, it won't help if we just
//       // send everything to anyone who asks!
//       attributes: ['id', 'username']
//     })
//     res.json(products);
//   } catch (err) {
//     next(err)
//   }
// })

// GET api/products/:id
// router.get('/', async (req, res, next) => {
//   try {
//     const product = await Product.findByPk(req.params.id, {
//         include:[]
//     })
//     res.json(product);
//   } catch (err) {
//     next(err)
//   }
// })
