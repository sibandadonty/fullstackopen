const Blog = require("../models/blog");

const notes = [
  {
    content: 'HTML is easy',
    important: false,
  },
  {
    content: 'Browser can execute only JavaScript',
    important: true,
  },
]

const blogs = [
  {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
  },
  {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  },
  {
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
  },
]

const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
    const result = blogs.reduce((accumulator, currVal) => {
        return accumulator + currVal.likes;
    }, 0) 
    return result;
}

const favoriteBlog = (blogs) => {
   return blogs.reduce((max, item) => {
      return item.likes > max.likes ? item : max;
   })
}

const mostLikes = (blogs) => {
    const result = blogs.reduce((max, item) => {
        return item.likes > max.likes ? item : max;
    })

    return {
        author: result.author,
        likes: result.likes
    }
}

const blogsInDB = async () => {
   const response = await Blog.find({});
   
   const blogs = response.map(blog => {
      return blog.toJSON();
   })
   
   return blogs;
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostLikes, blogs, blogsInDB  
}
