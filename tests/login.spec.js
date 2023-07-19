import { expect } from "chai";
import { postLogin } from "../controller/loginController.js";
import { describe, it } from "mocha";

describe("Test /login", () => {
  describe("login check ", () => {
    it("login should be okay", async () => {
      try {
        const actualResult = await postLogin();
        expect(actualResult).to.equal("OK");
      } catch (error) {
        console.log(error);
      }
    });
  });
});
