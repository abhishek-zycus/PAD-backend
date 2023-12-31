import { describe, it } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";

// Assertion
chai.should();
chai.use(chaiHttp);

describe("POST: Login check ", () => {
  const requests = chai.request("http://localhost:5000");
  it("login should be okay", (done) => {
    requests
      .post("/api/login")
      .send({ email: "kumar.abhishek@zycus.com", password: "11111111" })
      .end(function (err, res) {
        if (err) return done(err);
        // console.log(res);
        res.should.have.status(200);
        res.body.should.be.an("object");
        res.body.token.length.should.not.equal(0);
        return done();
      });
  });
});
