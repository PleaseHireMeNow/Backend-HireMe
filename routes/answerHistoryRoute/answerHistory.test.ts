import express, { Application, Request, Response } from "express";
import question from "../../testing/db/question.json";

const app = require("../../server");
const request = require("supertest");
const usersInDatabase = require("../../testing/db/user.json");

describe("answer history route test", () => {
  const correctUserid = usersInDatabase[0].userId;
  const incorrectUserid = "jkrsgfd65876w34^%$lkaldjf;e345";

  test("answerHistory get route success test, should give array of answer history objects", done => {
    request(app)
      .get(`/api/answerHistory/${correctUserid}`)
      .end((err: Object, res: Response) => {
        if (err) {
          console.error(err);
        }
        // console.log('answerHistory response is:', res);
        expect(res.status).toBe(200);
        if ("body" in res) {
          console.log(question[20]);
          console.log(question.length);
          expect(res.body).toEqual(question);
          expect(res.body).toHaveLength(20);
        }
      });
      done();
  });

  test("answerHistory get route incorrect userid, should send 403", done => {
    request(app)
      .get(`/api/answerHistory/${incorrectUserid}`)
      .end((err: Object, res: Response) => {
        if (err) {
          console.error(err);
        }
        expect(res.status).toBe(403);
      });
      done()
  });
});
