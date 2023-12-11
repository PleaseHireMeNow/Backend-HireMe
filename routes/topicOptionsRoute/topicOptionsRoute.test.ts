import express, { Application, Request, Response } from 'express';
const app = require('../../server')
const request = require('supertest')
import topicOptions from '../../testing/db/topic-options.json'

describe("topic options route", () => {
  it.only("should get the topic options", (done) => {
    request(app)
      .get(`/api/topic-options/`)
      .end((err: Object, res: Response) => {
        if (err) {
          console.error(err);
        }
        expect(res.status).toBe(200)
        if ('body' in res) {
          console.log("resbody", res.body)
          expect(res.body).toMatchObject(topicOptions)
        }
        done();
      })
  }, 1000)
})
