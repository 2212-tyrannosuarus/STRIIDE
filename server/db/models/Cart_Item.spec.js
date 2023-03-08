/* global describe beforeEach it */
const { expect } = require("chai");
const {
  models: { Cart_Item },
} = require("../index");

describe("Cart_Item Model", () => {
  it("validates the input of quantity", async () => {
    let cartItem = await Cart_Item.build({
      quantity: 5,
    });
    expect(cartItem.quantity).to.equal(5);
  });
  it("validates the input of size", async () => {
    let cartItem = await Cart_Item.build({
      size: "6 M / 8 F",
    });
    expect(cartItem.size).to.equal("6 M / 8 F");
  });
  it("validates the input of color", async () => {
    let cartItem = await Cart_Item.build({
      color: "Blue",
    });
    expect(cartItem.color).to.equal("Blue");
  });
  it("validates the constraint of quantity", async () => {
    try {
      await Cart_Item.create({
        quantity: "notANumber",
      });
      throw "failed";
    } catch (e) {
      expect(e.name).to.equal("SequelizeDatabaseError");
    }
  });
});
