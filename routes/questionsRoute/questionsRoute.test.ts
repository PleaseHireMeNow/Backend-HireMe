const app = require('../../server')
const request = require('supertest')
const usersInDatabase = require('../../testing/db/user.json')

describe("is userid in database", () => {
  const correctUserid = usersInDatabase[0].userId
  const incorrectUserid = ";ljasdj;lksad;jkfj;lkdsajkl;dfsaj;kl"
  it.skip("correct user id should give us a 200", (done) => {
    request(app)
      .get(`/api/questions/${correctUserid}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        expect(res.status).toBe(200)
        done();
      })
  })
  it("correct user id should give us a 200", (done) => {
    request(app)
      .get(`/api/questions/${incorrectUserid}`)
      .expect(404)
      .end((err, res) => {
        if (err) {
          console.error(err);
          done();
        }
        expect(res.status).toBe(404)
        done();
      })
  })
})

describe("crud operations on questions using mock database", () => {
  it.skip("get request", (done) => {
    console.log(usersInDatabase)
    const userid = usersInDatabase[0].userId
    request(app)
      .get(`/api/questions/${userid}`)
      .expect(200)
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        expect(res.status).toBe(200)
        // need to elaborate on expected results
        done();
      })
  })
})

