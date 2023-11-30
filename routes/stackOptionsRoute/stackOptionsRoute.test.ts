import express, { Application, Request, Response } from 'express';
const app = require('../../server')
const request = require('supertest')
import stackOptions from '../../testing/db/stack-options.json'

describe("stack options route", () => {
  it.only("should get the stack options", (done) => {
    request(app)
      .get(`/api/stackOptions/`)
      .end((err: Object, res: Response) => {
        if (err) {
          console.error(err);
        }
        expect(res.status).toBe(200)
        if ('body' in res) {
          console.log("resbody", res.body)
          expect(res.body).toMatchObject(stackOptions)
        }
        done();
      })
  }, 1000)
})
