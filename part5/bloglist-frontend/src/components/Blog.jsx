import { useState } from "react";
import blogServices from "../services/blogs";

const Blog = ({ blog, user }) => {
  const [viewDetails, setViewDetails] = useState(false);
  const [likes, setLikes] = useState(blog.likes);
  const handleSetView = () => {
    setViewDetails((prev) => !prev);
  };

  const handleLikeBlog = async () => {
    const updatedLikes = likes + 1;
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
    );
    setLikes(updatedLikes);
  };

  const handleBlogRemove = async () => {
    const isApproved = confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (!isApproved) {
      return;
    }
    await blogServices.deleteBlog(blog.id, user.token);
  };

  return (
    <div>
      <div className="back-border">
        {blog.title} {blog.author}
        {""}
        <button onClick={handleSetView}>{viewDetails ? "hide" : "view"}</button>
      </div>
      {viewDetails && (
        <div className="back-border">
          <p>{blog.url}</p>
          <p>
            likes {likes} <button onClick={handleLikeBlog}>like</button>
          </p>
          <p>{blog.author}</p>
          {user.id === blog.user.id && <button onClick={handleBlogRemove}>remove</button> }
        </div>
      )}
    </div>
  );
};

export default Blog;
