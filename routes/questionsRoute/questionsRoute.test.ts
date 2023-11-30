import express, { Application, Request, Response } from 'express';
const app = require('../../server')
const request = require('supertest')
const usersInDatabase = require('../../testing/db/user.json')
import question from '../../testing/db/question.json'
describe("is userid in database", () => {
  const correctUserid = usersInDatabase[0].userId
  const incorrectUserid = ";ljasdj;lksad;jkfj;lkdsajkl;dfsaj;kl"
  it("correct user id should give us a 200", (done) => {
    request(app)
      .get(`/api/questions/${correctUserid}`)
      .end((err: Object, res: Response) => {
        if (err) {
          console.error(err);
        }
        expect(res.status).toBe(200)
        done();
      })
  })
  it("incorrect user id should give us a 403", (done) => {
    request(app)
      .get(`/api/questions/${incorrectUserid}`)
      .end((err: Object, res: Response) => {
        if (err) {
          console.error(err);
          done();
        }
        expect(res.status).toBe(403)
        done();
      })
  })
})

describe("crud operations on questions using mock database", () => {
  it("get request", (done) => {
    console.log(usersInDatabase)
    const userid = usersInDatabase[0].userId
    request(app)
      .get(`/api/questions/${userid}`)
      .end((err: Object, res: Response) => {
        if (err) {
          console.error(err);
        }
        expect(res.status).toBe(200)
        if ("body" in res) {
          expect(res.body).toEqual(question);
          expect(res.body).toHaveLength(20);
        }
        done();
      })
  })
})

