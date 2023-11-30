import express, { Application, Request, Response } from "express";
import selection from "../../testing/db/stack-selection.json";


const app = require("../../server");
const request = require("supertest");
const usersInDatabase = require("../../testing/db/user.json");

describe("stackSelection route test", () => {
  const correctUserid = usersInDatabase[0].userId;
  const incorrectUserid = "lkh34590dsa8fl4i3k5j";

  test("stackSelection GET route success test, should return array of strings & status 200", done => {
    // start dummy server
    request(app)
      .get(`/api/stackSelection/${correctUserid}`)
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
  });

  test("stackSelection GET route incorrect userid, should send 403", done => {
    request(app)
      .get(`/api/stackSelection/${incorrectUserid}`)
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



});
