/* global describe beforeEach it */
const { expect } = require("chai");
const {
  models: { Product },
} = require("../index");

describe("Product Model", () => {
  it("does not allow null for name", async () => {
    try {
      let product = await Product.build({
        name: null,
        description: "test description",
        image: "testImage.jpg",
        black_images: ["test"],
        white_images: ["test"],
        blue_images: ["test"],
        green_images: ["test"],
        pink_images: ["test"],
        purple_images: ["test"],
        price: 10.0,
        product_category: "testCategory",
        color_category: "testColorCategory",
        gender: "Men",
      });
    } catch (e) {
      expect(e.name).to.equal("SequelizeUniqueConstraintError");
    }
  });
  it("validates the input of name", async () => {
    let product = await Product.build({
      name: "testProduct",
      description: "test description",
      image: "testImage.jpg",
      black_images: ["test"],
      white_images: ["test"],
      blue_images: ["test"],
      green_images: ["test"],
      pink_images: ["test"],
      purple_images: ["test"],
      price: 10.0,
      product_category: "testCategory",
      color_category: "testColorCategory",
      gender: "Men",
    });
    expect(product.name).to.equal("testProduct");
  });
  it("validates the input of description", async () => {
    let product = await Product.build({
      name: "testProduct",
      description: "test description",
      image: "testImage.jpg",
      black_images: ["test"],
      white_images: ["test"],
      blue_images: ["test"],
      green_images: ["test"],
      pink_images: ["test"],
      purple_images: ["test"],
      price: 10.0,
      product_category: "testCategory",
      color_category: "testColorCategory",
      gender: "Men",
    });
    expect(product.description).to.equal("test description");
  });
  it("validates the input of image", async () => {
    let product = await Product.build({
      name: "testProduct",
      description: "test description",
      image: "testImage.jpg",
      black_images: ["test"],
      white_images: ["test"],
      blue_images: ["test"],
      green_images: ["test"],
      pink_images: ["test"],
      purple_images: ["test"],
      price: 10.0,
      product_category: "testCategory",
      color_category: "testColorCategory",
      gender: "Men",
    });
    expect(product.image).to.equal("testImage.jpg");
  });
});
