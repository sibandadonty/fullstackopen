const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: {
    type: Number,
    default: 0
  }
})

blogSchema.set("toJSON", {
    transform: function (doc, ret) {
      delete ret.__v; 
      ret.id = ret._id.toString();
      delete ret._id;
      return ret;
    }
})

const Blog = mongoose.model('Blog', blogSchema)

module.exports = Blog