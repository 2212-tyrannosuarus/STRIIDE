/* global describe beforeEach it */
const { expect } = require("chai");
const {
  models: { Payment },
} = require("../index");

describe("Size Model", () => {
  it("validates the input of payment type", async () => {
    let payment = await Payment.build({
      payment_type: "credit",
      card_number: "123456789",
      expiration: "01/2030",
    });
    expect(payment.payment_type).to.equal("credit");
  });
  it("validates the input of card number", async () => {
    let payment = await Payment.build({
      payment_type: "credit",
      card_number: "123456789",
      expiration: "01/2030",
    });
    expect(payment.card_number).to.equal("123456789");
  });
  it("validates the input of expiration", async () => {
    let payment = await Payment.build({
      payment_type: "credit",
      card_number: "123456789",
      expiration: "01/2030",
    });
    expect(payment.expiration).to.equal("01/2030");
  });
  it("does not allow null values", async () => {
    try {
      await Payment.create({
        payment_type: null,
        card_number: "123456789",
        expiration: "01/2030",
      });
      throw "failed";
    } catch (ex) {
      expect(ex.name).to.equal("SequelizeValidationError");
    }
  });
  it("does not allow null values", async () => {
    try {
      await Payment.create({
        payment_type: "credit",
        card_number: null,
        expiration: "01/2030",
      });
      throw "failed";
    } catch (ex) {
      expect(ex.name).to.equal("SequelizeValidationError");
    }
  });
  it("does not allow null values", async () => {
    try {
      await Payment.create({
        payment_type: "credit",
        card_number: "123456789",
        expiration: null,
      });
      throw "failed";
    } catch (ex) {
      expect(ex.name).to.equal("SequelizeValidationError");
    }
  });
});
