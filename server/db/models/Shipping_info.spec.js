/* global describe beforeEach it */
const { expect } = require("chai");
const {
  models: { Shipping_Info },
} = require("../index");

describe("Shipping Info Model", () => {
  it("validates the input of address1", async () => {
    let shipping_info = await Shipping_Info.build({
      address1: "123 Main Street",
      address2: "Apt. 3",
      city: "New York",
      state: "NY",
      zipcode: "12345",
      country: "USA",
    });
    expect(shipping_info.address1).to.equal("123 Main Street");
  });
  it("validates the input of city", async () => {
    let shipping_info = await Shipping_Info.build({
      address1: "123 Main Street",
      address2: "Apt. 3",
      city: "New York",
      state: "NY",
      zipcode: "12345",
      country: "USA",
    });
    expect(shipping_info.city).to.equal("New York");
  });
  it("validates the input of zipcode", async () => {
    let shipping_info = await Shipping_Info.build({
      address1: "123 Main Street",
      address2: "Apt. 3",
      city: "New York",
      state: "NY",
      zipcode: "12345",
      country: "USA",
    });
    expect(shipping_info.zipcode).to.equal("12345");
  });
  it("validates the input of state", async () => {
    let shipping_info = await Shipping_Info.build({
      address1: "123 Main Street",
      address2: "Apt. 3",
      city: "New York",
      state: "NY",
      zipcode: "12345",
      country: "USA",
    });
    expect(shipping_info.state).to.equal("NY");
  });
  it("validates the input of country", async () => {
    let shipping_info = await Shipping_Info.build({
      address1: "123 Main Street",
      address2: "Apt. 3",
      city: "New York",
      state: "NY",
      zipcode: "12345",
      country: "USA",
    });
    expect(shipping_info.country).to.equal("USA");
  });
});
