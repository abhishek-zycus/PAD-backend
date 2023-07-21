import { describe, it } from "mocha";
import chai from "chai";
import chaiHttp from "chai-http";

// Assertion
chai.should();
chai.use(chaiHttp);

const random = Math.floor(Math.random() * 1000);

const token =
  "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoidGVzdDUiLCJpZCI6IjY0Yjc4MmJkODFkZDM3ZDA0MDhkYzIyOCIsInJvbGUiOiJBRE1JTiIsImlhdCI6MTY4OTc1MDI0NX0.KTkLV9NoN_QR5scki0F507kh8ylCBG4iJwm_tURbmOQ";

describe("GET: Role check ", () => {
  const requests = chai.request("http://localhost:5000");
  it("Get all role should be okay", (done) => {
    requests.get("/api/role").end(function (err, res) {
      if (err) return done(err);
      res.should.have.status(200);
      res.body.roles.length.should.not.equal(0);
      return done();
    });
  });

  it("Create new role should be okay", (done) => {
    requests
      .post("/api/role")
      .set("Authorization", token)
      .send({
        roleName: "TEST" + random,
        permissions: {
          isTotalContractVisible: true,
          isAvgRevenueVisible: true,
          isTotalDuePaymentVisible: true,
          isTotalExpectedPaymentVisible: true,
          canCreateRole: false,
        },
      })
      .end(function (err, res) {
        if (err) return done(err);
        res.should.have.status(200);
        res.body.data.should.be.an("object");
        return done();
      });
  });
});
