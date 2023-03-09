/* global describe beforeEach it */
const { expect } = require("chai");
const {
  models: { User },
} = require("../index");
const { db } = require("../db");

describe("User model", () => {
  let users;

  it("requires unique username", async () => {
    try {
      await User.create({
        password: "test3",
        firstname: "mochaChai",
        lastname: "ChaiMocha",
        username: "mocha.chai",
        email: "mochaChai@chai.com",
        status: "guest",
        phone_number: "1234561234",
      });
      throw "failed";
    } catch (e) {
      expect(e.name).to.equal("SequelizeUniqueConstraintError");
    }
  });
  it("validates the input of email", async () => {
    let user = await User.build({
      username: "validusername",
      password: "test3",
      firstname: "mochaChai",
      lastname: "ChaiMocha",
      email: "mochaChai@chai.com",
      status: "guest",
      phone_number: "1234561234",
    });
    expect(user.email).to.equal("mochaChai@chai.com");
  });
  it("validates the input of phone number", async () => {
    let user = await User.build({
      username: "validusername",
      password: "test3",
      firstname: "mochaChai",
      lastname: "ChaiMocha",
      email: "mochaChai@chai.com",
      status: "guest",
      phone_number: "1234561234",
    });
    expect(user.phone_number).to.equal("1234561234");
  });
});
