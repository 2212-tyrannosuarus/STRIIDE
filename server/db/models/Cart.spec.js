/* global describe beforeEach it */
const { expect } = require("chai");
const {
  models: { Cart },
} = require("../index");

describe("Cart Model", () => {
  it("validates the data type of total", async () => {
    let cart = await Cart.build();
    expect(cart.total).to.be.a("number");
  });
  it("validates the input of total", async () => {
    let cart = await Cart.build({
      total: 10,
    });
    expect(cart.total).to.equal(10);
  });
  it("validates the default value of total", async () => {
    let cart = await Cart.build();
    expect(cart.total).to.equal(0);
  });
});
