const { after, test, beforeEach } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const { blogs } = require("../utils/list_helper");
const Blog = require("../models/blog");

const api = request(app);

beforeEach(async () => {
    await Blog.deleteMany({});
    await Blog.insertMany(blogs);
})

test("GET /api/blogs", async () => {
    api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/)

    const response = await api.get("/api/blogs");
    assert.strictEqual(response.body.length, blogs.length);
    
})


after( async () => {
    await mongoose.connection.close();
})