const router = require("express").Router();
const {
  models: { User, Payment },
} = require("../db");
module.exports = router;

//PUT /api/paymentmethod/:userId
router.put("/:userId", async (req, res, next) => {
  try {
    const updatedPaymentMethod = await Payment.update(
      {
        payment_type: req.body.payment_type,
        card_number: req.body.card_number,
        expiration: req.body.expiration,
      },
      {
        where: {
          userId: req.params.userId,
        },
      }
    );

    res.status(201).json(updatedPaymentMethod);
  } catch (err) {
    next(err);
  }
});


//POST /api/paymentMethod/:userId
router.post("/:userId", async (req, res, next) => {
    try {
      const newpaymentMethod = await Payment.create(
        {
          payment_type: req.body.payment_type,
          card_number: req.body.card_number,
          expiration: req.body.expiration,
        }
      );
  
      const user = User.findByPk(req.params.userId);
      newpaymentMethod.setUser(user);
      res.status(201).json(newpaymentMethod);
    } catch (err) {
      next(err);
    }
  });
