/* global describe beforeEach it */
const { expect } = require("chai");
const {
  models: { Colorway },
} = require("../index");

describe("Colorway Model", () => {
  it("validates the input of color", async () => {
    let colorway = await Colorway.build({
      color: "red",
    });
    expect(colorway.color).to.equal("red");
  });
  it("validates that color is a string", async () => {
    let colorway = await Colorway.build({
      color: "red",
    });
    expect(typeof colorway.color).to.equal("string");
  });
});
