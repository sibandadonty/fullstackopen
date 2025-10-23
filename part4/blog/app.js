const config = require("./utils/config");
const express = require('express')
const mongoose = require('mongoose')
const app = express()
const logger = require("./utils/logger");
const middleware = require("./utils/middleware");
const Blog = require("./models/blog");
const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");

mongoose.connect(config.DATABASE_URL).then(() => {
   logger.info("Database connected successfully")
}).catch(err => {
    logger.error(err)
})

app.use(express.json())
app.use(middleware.tokenExtractor)
app.use("/api/blogs", blogRouter)
app.use("/api/users", userRouter)
app.use("/api/login", loginRouter)
if (process.env.NODE_ENV === 'test') {
    const testRouter = require("./controllers/test")
    app.use("/api/test", testRouter)
}
//always the last middleware to be used
app.use(middleware.errorHandler)

module.exports = app;