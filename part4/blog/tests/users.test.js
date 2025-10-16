const supertest = require("supertest");
const User = require("../models/user");
const { test, after, beforeEach, describe } = require("node:test");
const mongoose = require("mongoose");
const { sampleUsers, usersInDB } = require("../utils/list_helper");
const app = require("../app");
const assert = require("node:assert");

const api = supertest(app);

// const sampleUser = {
//   name: "Donty Moyo",
//   username: "donty123",
//   password: "securePass"
// }

beforeEach(async () => {
    await User.deleteMany({});
    await User.insertMany(sampleUsers)
})


describe("validate username password and if user is unique", () => {
    test("username is provided and is atleast 3 characters", async () => {
        const sampleUser = {
            name: "Donty Moyo",
            username: "do",
            password: "securePass"
        }

        const response = await api
                               .post("/api/users")
                               .send(sampleUser)
                               .expect(400)
        
        assert.match(response.body.error, /Username must be at least 3 characters long/i);
        
        const usersAtEnd = await usersInDB();
        assert.strictEqual(usersAtEnd.length, sampleUsers.length)
        
    })
    test("password is provided and is atleast 3 characters long", async () => {
        const sampleUser = {
            name: "Donty Moyo",
            username: "donty123",
            password: "se"
        }

        const response = await api
                               .post("/api/users")
                               .send(sampleUser)
                               .expect(400)
        
        assert.match(response.body.error, /Password must be at least 3 characters long/i);
        
        const usersAtEnd = await usersInDB();
        assert.strictEqual(usersAtEnd.length, sampleUsers.length)
    })
    test("user is unique", async () => {
        const response = await api
                                .post("/api/users")
                                .send(sampleUsers[0])
                                .expect(400)
        
        assert.match(response.body.error, /Username must be unique/i);


        const usersAtEnd = await usersInDB();
        assert.strictEqual(usersAtEnd.length, sampleUsers.length)
    })

    test("valid user is created successfully", async () => {
        const newUser = {
            name: "Valid User",
            username: "valid123",
            password: "strongPass"
        };

        const response = await api
                           .post("/api/users") 
                           .send(newUser) 
                           .expect(201);
        const usersAtEnd = await usersInDB();
        assert.strictEqual(usersAtEnd.length, sampleUsers.length + 1);
    });

})


after(async () => {
    await mongoose.connection.close();
})