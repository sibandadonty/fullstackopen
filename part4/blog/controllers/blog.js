const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

blogRouter.get('/', async (request, response) => {
  const results = await Blog.find({}).populate("user", { username: 1, name: 1, id: 1 });
  
  response.json(results.map(blog => blog.toJSON() ) );
})


blogRouter.post('/', async (request, response) => {
  const { title, url} = request.body;

  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  
  if (!decodedToken.id) {
    return response.status(401).json({error: "invalid token"})
  }

  if (!title || !url) {
    return response.status(400).end();
  }

  const user = await User.findById(decodedToken.id);

  if (!user) {
    return response.status(400).json({error: "invalid or missing id"});
  }

  const blog = new Blog({...request.body, user: user._id})

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save();

  response.status(201).json(blog);
})

blogRouter.delete("/:id", async (request, response) => {
  
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  
  if (!decodedToken.id) {
    return response.status(401).json({error: "invalid token"})
  }

  const blog = await Blog.findById(request.params.id); 
  if (!blog) {
    return response.status(404).json({ error: "Blog not found" });
  }

  if (blog.user.toString() !== decodedToken.id) {
    return response.status(401).json({error: "not authorized to delete blog"})
  }
  
  await blog.deleteOne()

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