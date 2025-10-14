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

module.exports = {
  dummy, totalLikes, favoriteBlog, mostLikes  
}
