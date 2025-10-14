const config = require("./utils/config");
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const Blog = require("./models/blog");
const blogRouter = require("./controllers/blog");

mongoose.connect(config.DATABASE_URL).then(() => {
   logger.info("Database connected successfully")
}).catch(err => {
    logger.error(err)
})

app.use(express.json())
app.use("/api/blogs", blogRouter)
//always the last middleware to be used
app.use(middleware.errorHandler)

module.exports = app;