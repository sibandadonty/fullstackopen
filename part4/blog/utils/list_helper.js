const dummy = (blogs) => {
  return 1;
}

const totalLikes = (blogs) => {
    const result = blogs.reduce((accumulator, currVal) => {
        return accumulator + currVal.likes;
    }, 0) 
    return result;
}

module.exports = {
  dummy, totalLikes
}
