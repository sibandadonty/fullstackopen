const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get('/', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs.map(blog => blog.toJSON() ) );    
  })
})

blogRouter.post('/', (request, response) => {
  const { title, url} = request.body;

  if (!title || !url) {
    return response.status(400).end();
  }

  const blog = new Blog(request.body)

  blog .save().then((result) => {
    response.status(201).json(result)
  })
})

blogRouter.delete("/:id", async (request, response) => {
  const deletedBlog = await Blog.findByIdAndDelete(request.params.id);
  if (!deletedBlog) {
    return response.status(404).json({ error: "Blog not found" });
  }
  response.status(204).end();
});

module.exports = blogRouter;