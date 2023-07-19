import { describe, it } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";

// Assertion
chai.should();
chai.use(chaiHttp);

describe("POST: Register check ", () => {
  const requests = chai.request("http://localhost:5000");
  it("Register should be okay", (done) => {
    requests
      .post("/api/register")
      .send({
        email: "kumar1.abhishek@zycus.com",
        password: "11111111",
        name: "Ram",
        role: "NORMAL",
      })
      .end(function (err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.should.be.an("object");
        res.body.token.length.should.not.equal(0);
        return done();
      });
  });
});
