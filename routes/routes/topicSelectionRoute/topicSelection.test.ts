import express, { Application, Request, Response } from "express";
import selection from "../../testing/db/user.json";


const app = require("../../server");
const request = require("supertest");
const usersInDatabase = require("../../testing/db/user.json");

const correctUserid = usersInDatabase[0].userId;
const incorrectUserid = "lkh34590dsa8fl4i3k5j";

describe("topic-selection route test", () => {

  // GET TESTS
  test("topic-selection GET route success test, should return array of strings & status 200", done => {
    // start dummy server
    request(app)
      .get(`/api/topic-selection/${correctUserid}`)
      .end((err: Object, res: Response) => {
        
        if (err) {
          console.error(err);
        }
        expect(res.status).toBe(200)
        if ("body" in res) {
          expect(res.body).toEqual(selection);
          // expect(res.body).toHaveLength(20);
        }
        done();
      });
  }, 1000);

  test("topic-selection GET route incorrect userid, should send 403", done => {
    request(app)
      .get(`/api/topic-selection/${incorrectUserid}`)
      .expect(403)
      .end((err: Object, res: Response) => {
        if (err) {
          console.error(err);
          done(err)
        } else {
          done()
        }
      });
  }, 1000);


// POST TESTS
test("topic-selection POST route success test, should send status 200", done => {
  // start dummy server
  request(app)
    .post(`/api/topic-selection/${correctUserid}`)
    .end((err: Object, res: Response) => {
      if (err) {
        console.error(err);
      }
      expect(res.status).toBe(200)
      done();
    });
}, 1000);

test("topic-selection POST route incorrect userid, should send 403", done => {
  request(app)
    .post(`/api/topic-selection/${incorrectUserid}`)
    .expect(403)
    .end((err: Object, res: Response) => {
      if (err) {
        console.error(err);
        done(err)
      } else {
        done()
      }
    });
}, 1000);

// PUT TESTS
test("topic-selection PUT route success test, should send status 200", done => {
  // start dummy server
  request(app)
    .put(`/api/topic-selection/${correctUserid}`)
    .end((err: Object, res: Response) => {
      if (err) {
        console.error(err);
      }
      expect(res.status).toBe(200)
      done();
    });
}, 1000);

test("topic-selection PUT route incorrect userid, should send 403", done => {
  request(app)
    .put(`/api/topic-selection/${incorrectUserid}`)
    .expect(403)
    .end((err: Object, res: Response) => {
      if (err) {
        console.error(err);
        done(err)
      } else {
        done()
      }
    });
}, 1000);


// DELETE TESTS
test.only("topic-selection DELETE route success test, should send status 200", done => {
  // start dummy server
  request(app)
    .delete(`/api/topic-selection/${correctUserid}`)
    .end((err: Object, res: Response) => {
      if (err) {
        console.error(err);
      }
      expect(res.status).toBe(200)
      done();
    });
}, 1000);

test.only("topic-selection DELETE route incorrect userid, should send 403", done => {
  request(app)
    .delete(`/api/topic-selection/${incorrectUserid}`)
    .expect(403)
    .end((err: Object, res: Response) => {
      if (err) {
        console.error(err);
        done(err)
      } else {
        done()
      }
    });
}, 1000);


});
