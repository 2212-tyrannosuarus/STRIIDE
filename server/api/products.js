const router = require("express").Router();
const {
  models: { Product, Cart_Item },
} = require("../db");
module.exports = router;

// GET api/products/
router.get("/", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [Cart_Item],
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/men", async (req, res, next) => {
  try {
    const products = await Product.findAll({
      where: { gender: "Men" },
    });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.get("/women", async (req, res, next) => {
  try {
    const products = await Product.findAll({ where: { gender: "Women" } });
    res.json(products);
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body));
  } catch (e) {
    next(e);
  }
});

// GET api/products/:id
router.get("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.json(product);
  } catch (err) {
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(await product.update(req.body));
  } catch (e) {
    next(e);
  }
});
