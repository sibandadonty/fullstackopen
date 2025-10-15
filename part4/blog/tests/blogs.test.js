const { after, test, beforeEach, describe } = require("node:test");
const assert = require("node:assert");
const mongoose = require("mongoose");
const request = require("supertest");
const app = require("../app");
const { blogs, blogsInDB } = require("../utils/list_helper");
const Blog = require("../models/blog");

const api = request(app);

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(blogs);
});

test("GET /api/blogs returns correct number of blogs", async () => {
    const response = await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);

    assert.strictEqual(response.body.length, blogs.length);
});

test("Unique identifier property of blog posts is named id", async () => {
  const response = await api.get("/api/blogs");
  assert(response.body[0].id !== undefined);
});

test("HTTP POST request to /api/blogs creates a new blog", async () => {
  const newBlog = {
    title: "Testing with Jest and Supertest",
    author: "Test Author", 
    url: "https://example.com/test",
    likes: 10,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await blogsInDB();
  assert.strictEqual(blogsAtEnd.length, blogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  assert(titles.includes("Testing with Jest and Supertest"));
});

test(" if the likes property is missing from the request, it will default to the value 0", async () => {
    const blogWithNoLikesField = {
        title: "Blog with no likes field",
        author: "Test Author", 
        url: "https://example.com/test",
    };
    
    const response = await api
          .post("/api/blogs")
          .send(blogWithNoLikesField)
          .expect(201)
          .expect("Content-Type", /application\/json/)
    
        assert.strictEqual(response.body.likes, 0);

})

describe("if the title or url properties are missing from the request data", () => {

    test("blog with no title", async () => {
        const blogWithNoTitle = {
            author: "Test Author", 
            url: "https://example.com/test",
            like: 53
        };
    
        await api
        .post("/api/blogs")
        .send(blogWithNoTitle)
        .expect(400)
    })

    
    test("blog with no url", async () => {
        const blogWithNoUrl = {
            title: "Blog with no title or content",
            author: "Test Author", 
            like: 53
        };
    
        await api
        .post("/api/blogs")
        .send(blogWithNoUrl)
        .expect(400)
    })

    test("blog without both url and title", async () => {
        const blogWithoutBoth = {
            author: "Test Author", 
            like: 53
        };
    
        await api
        .post("/api/blogs")
        .send(blogWithoutBoth)
        .expect(400)
    })
})

test("DELETE /api/blogs", async () => {
   const blogsAtStart = await blogsInDB();
   
   const blogToDelete = blogsAtStart[0];
   
   await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

   const blogsAtEnd = await blogsInDB();

   const authors = blogsAtEnd.map((n) => n.author)
   
   assert(!authors.includes(blogToDelete.author))
   assert(blogsAtEnd.length, blogs.length - 1);
})

after(async () => {
  await mongoose.connection.close();
});
