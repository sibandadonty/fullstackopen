import { useState } from 'react'
import blogServices from '../services/blogs'

const Blog = ({ blog, user }) => {
  const [viewDetails, setViewDetails] = useState(false)
  const [likes, setLikes] = useState(blog.likes)
  const handleSetView = () => {
    setViewDetails((prev) => !prev)
  }

  const handleLikeBlog = async () => {
    const updatedLikes = likes + 1
    await blogServices.updateLikes(
      {
        title: blog.title,
        url: blog.url,
        author: blog.author,
        user: user.id,
        likes: updatedLikes,
      },
      user.token,
      blog.id
    )
    setLikes(updatedLikes)
  }

  return (
    <div>
      <div className="back-border">
        {blog.title} {blog.author}
        {''}
        <button onClick={handleSetView}>{viewDetails ? 'hide' : 'view'}</button>
      </div>
      {viewDetails && (
        <div className="back-border">
          <p>{blog.url}</p>
          <p>
            likes {likes} <button onClick={handleLikeBlog}>like</button>
          </p>
          <p>{blog.author}</p>
        </div>
      )}
    </div>
  )
}

export default Blog
