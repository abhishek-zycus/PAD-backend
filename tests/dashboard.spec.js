import { describe, it } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";

// Assertion
chai.should();
chai.use(chaiHttp);

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdDUiLCJpZCI6IjY0Yjc4MmJkODFkZDM3ZDA0MDhkYzIyOCIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY4OTc1MDI0NX0.KTkLV9NoN_QR5scki0F507kh8ylCBG4iJwm_tURbmOQ";

describe("GET: Dashboard check ", () => {
  const requests = chai.request("http://localhost:5000");
  it("Dashboard should be okay", (done) => {
    requests
      .get("/api/dashboard")
      .set("Authorization", token)
      .end(function (err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.data.should.be.an("object");
        return done();
      });
  });
});
