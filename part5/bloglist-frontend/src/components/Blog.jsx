import { useState } from "react";

const Blog = ({ blog }) => {
  const [viewDetails, setViewDetails] = useState(false);
  const handleSetView = () => {
    setViewDetails((prev) => !prev);
  };
  return (
    <div>
      <div className="back-border">
        {blog.title} {blog.author}{" "}
        <button onClick={handleSetView}>{viewDetails ? "hide" : "view"}</button>
      </div>
      {viewDetails && (
        <div className="back-border">
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button>like</button>
          </p>
          <p>{blog.author}</p>
        </div>
      )}
    </div>
  );
};

export default Blog;
