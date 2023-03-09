/* global describe beforeEach it */
const { expect } = require("chai");
const {
  models: { Size },
} = require("../index");

describe("Size Model", () => {
  it("validates the input of size", async () => {
    let size = await Size.build({
      size: "6 M / 7 F",
    });
    expect(size.size).to.equal("6 M / 7 F");
  });
});
