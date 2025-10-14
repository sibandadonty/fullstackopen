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

module.exports = {
  dummy, totalLikes, favoriteBlog 
}
