import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    
    setUser(JSON.parse(user));
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setUser("");
  }

  return (
    <div>
      {!user && <LoginForm setUser={setUser} />}
      {user && (
        <>
          <h2>blogs</h2>
          {user && (
            <>
            <p style={{display: "inline-block"}}>{user.name} is logged in</p>
            <button onClick={handleLogout}>logout</button>
            </>
          )}
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
