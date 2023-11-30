import express, { Response } from "express";

const app = require("../../server");
const request = require("supertest");
const usersInDatabase = require("../../testing/db/user.json");



describe("User route test", () => {
    test("The get route with userID provided, should return user information", done => {
        request(app)
            .get(`/api/user/${usersInDatabase[0].userId}`)
            .end((err: Object, res: Response) => {
                if (err) {
                    console.error("err", err)
                }
                expect(res.status).toBe(200)

                done()
            })

    })

    test("This should return a 403 when given an incorrect user ID", done => {
        request(app)
            .get(`/api/user/${usersInDatabase[1].userId}`)
            .end((err: Object, res: Response) => {

                if (err) {
                    console.error("err", err)
                }
                expect(res.status).toBe(403)
                done()
            })
    }, 1000)
})

describe("User delete route working", () => {
    test("This should return a 200 when given any user ID", done => {
        request(app)
        .delete(`/api/user/${usersInDatabase[0].userId}`)
        .end((err: Object, res: Response) => {
            if (err) {
                console.error("err", err)
            }
            expect(res.status).toBe(200)
            done()
        }) 
    })
})

