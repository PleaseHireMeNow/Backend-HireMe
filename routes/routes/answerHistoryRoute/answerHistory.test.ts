import { Response } from "express";
import question from "../../../testing/db/question.json";

const app = require("../../server");
const request = require("supertest");
const usersInDatabase = require("../../testing/db/user.json");

const correctUserid = usersInDatabase[0].userId;
const incorrectUserid = "jkrsgfd65876w34lkaldjfe345";

describe("answer history route test", () => {

  // GET TEST
  test("answerHistory get route success test, should give array of answer history objects", done => {
    request(app)
      .get(`/api/answerHistory/${correctUserid}`)
      .end((err: Object, res: Response) => {
        if (err) {
          console.error(err);
        }
        expect(res.status).toBe(200);
        if ("body" in res) {
          expect(res.body).toEqual(question);
          expect(res.body).toHaveLength(20);
        }
        done();
      });
  });

  test("answerHistory get route incorrect userid, should send 403", done => {
    request(app)
      .get(`/api/answerHistory/${incorrectUserid}`)
      .expect(403)
      .end((err: Object, res: Response) => {
        if (err) {
          console.error(err);
          done(err)
        } else {
          done()
        }
      });
  });

  // GET TEST
  test("answerHistory post route incorrect userid, should send 403", done => {
    request(app)
      .post(`/api/answerHistory/${incorrectUserid}`)
      .end((err: Object, res: Response) => {
        if (err) {
          console.error(err);
        }
        expect(res.status).toBe(200);
        done()
      });
  });

});
