import React, { useState } from "react";
import blogService from "../services/blogs";

const AddBlogForm = ({ token, setNotification }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [blog, setBlog] = useState();
  
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const results = await blogService.addBlog({ title, author, url }, token);

    setBlog(results);
    setAuthor("");
    setTitle("");
    setUrl("");
    setNotification({
        message: "blog added successfully",
        isError: false
    })
    setTimeout(() => {
        setNotification(undefined);
    }, 5000)
  };
  return (
    <form onSubmit={handleFormSubmit}>
      <h1>Create New</h1>
      <label style={{ display: "block", marginBottom: 5 }}>
        title:{" "}
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <label style={{ display: "block", marginBottom: 5 }}>
        author:{" "}
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
      </label>
      <label style={{ display: "block", marginBottom: 5 }}>
        url:{" "}
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
      </label>
      <button>Submit</button>
    </form>
  );
};

export default AddBlogForm;
