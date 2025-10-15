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

blogRouter.put("/:id", async (request, response) => {
  const {title, url, likes, author} = request.body;
  const result = await Blog.findById(request.params.id);

  if (!result) {
    return response.status(404).end()
  }
  
  result.author = author;
  result.url = url;
  result.likes = likes;
  result.title = title;

  const updatedBlog = await result.save();

  response.json(updatedBlog);
})

module.exports = blogRouter;