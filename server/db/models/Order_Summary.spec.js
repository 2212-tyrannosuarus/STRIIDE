/* global describe beforeEach it */
const { expect } = require("chai");
const {
  models: { Order_Summary },
} = require("../index");

describe("Order Summary Model", () => {
  it("validates the input of total_price", async () => {
    let order = await Order_Summary.build({
      total_price: 100.0,
      orderDate: "07APR2023",
    });
    expect(order.total_price).to.equal(100.0);
  });
  it("validates the data type of total_price", async () => {
    let order = await Order_Summary.build({
      total_price: 100.0,
      orderDate: "07APR2023",
    });
    expect(typeof order.total_price).to.equal("number");
  });
  it("validates the input of orderDate", async () => {
    let order = await Order_Summary.build({
      total_price: 100.0,
      orderDate: "07APR2023",
    });
    expect(order.orderDate).to.equal("07APR2023");
  });
  it("validates the data type of orderDate", async () => {
    let order = await Order_Summary.build({
      total_price: 100.0,
      orderDate: "07APR2023",
    });
    expect(typeof order.orderDate).to.equal("string");
  });
});
