/* global describe beforeEach it */
const { expect } = require("chai");
const {
  models: { Inventory },
} = require("../index");

describe("Inventory Model", () => {
  it("validates that only integers are allowed in the count field", async () => {
    try {
      let inventory = await Inventory.create({
        count: "notAnInteger",
      });
    } catch (e) {
      expect(e.name).to.equal("SequelizeDatabaseError");
    }
  });
  it("validates that the default value for the count field is 0", async () => {
    let inventory = await Inventory.create({});
    expect(inventory.count).to.equal(0);
  });
});
