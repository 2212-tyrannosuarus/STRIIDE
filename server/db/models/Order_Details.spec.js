/* global describe beforeEach it */
const { expect } = require("chai");
const {
  models: { Order_Detail },
} = require("../index");

describe("Order_Details model", () => {
  it("validates the input of quantity", async () => {
    let orderDetail = await Order_Detail.build({
      quantity: 5,
      color: "red",
      size: "test",
      image: "image.jpg",
      name: "shoe",
      historic_price: 100,
    });
    expect(orderDetail.quantity).to.equal(5);
  });
  it("validates the input of color", async () => {
    let orderDetail = await Order_Detail.build({
      quantity: 5,
      color: "red",
      size: "test",
      image: "image.jpg",
      name: "shoe",
      historic_price: 100,
    });
    expect(orderDetail.color).to.equal("red");
  });
  it("validates the input of size", async () => {
    let orderDetail = await Order_Detail.build({
      quantity: 5,
      color: "red",
      size: "test",
      image: "image.jpg",
      name: "shoe",
      historic_price: 100,
    });
    expect(orderDetail.size).to.equal("test");
  });
  it("validates the input of image", async () => {
    let orderDetail = await Order_Detail.build({
      quantity: 5,
      color: "red",
      size: "test",
      image: "image.jpg",
      name: "shoe",
      historic_price: 100,
    });
    expect(orderDetail.image).to.equal("image.jpg");
  });
  it("validates the input of name", async () => {
    let orderDetail = await Order_Detail.build({
      quantity: 5,
      color: "red",
      size: "test",
      image: "image.jpg",
      name: "shoe",
      historic_price: 100,
    });
    expect(orderDetail.name).to.equal("shoe");
  });
  it("validates the input of historic_price", async () => {
    let orderDetail = await Order_Detail.build({
      quantity: 5,
      color: "red",
      size: "test",
      image: "image.jpg",
      name: "shoe",
      historic_price: 100,
    });
    expect(orderDetail.historic_price).to.equal(100);
  });
  it("does not allow null values for quantity", async () => {
    try {
      await Order_Detail.create({
        quantity: null,
        color: "red",
        size: "test",
        image: "image.jpg",
        name: "shoe",
        historic_price: 100,
      });
      throw "failed";
    } catch (ex) {
      expect(ex.message).to.equal(
        "notNull Violation: orderdetail.quantity cannot be null"
      );
    }
  });
  it("does not allow null values for quantity", async () => {
    try {
      await Order_Detail.create({
        quantity: 5,
        color: "red",
        size: "test",
        image: "image.jpg",
        name: "shoe",
        historic_price: null,
      });
      throw "failed";
    } catch (ex) {
      expect(ex.message).to.equal(
        "notNull Violation: orderdetail.historic_price cannot be null"
      );
    }
  });
});
