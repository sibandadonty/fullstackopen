import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();
  const [notification, setNotification] = useState();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setUser(JSON.parse(user));
    setNotification({
      message: "login successful",
      isError: false
    })
    setTimeout(() => {
      setNotification(undefined)
    }, 5000)
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setNotification({
      message: "logout successful",
      isError: false
    })
    setUser("");
    setTimeout(() => {
      setNotification(undefined);
    }, 5000)
  };

  return (
    <div>
      {!user && <LoginForm setUser={setUser} setNotification={setNotification} />}
      {user && (
        <>
          <h2>blogs</h2>
          {notification && <Notification message={notification.message} isError={notification.isError}/>}
          {user && (
            <>
              <p style={{ display: "inline-block" }}>
                {user.name} is logged in
              </p>
              <button onClick={handleLogout}>logout</button>
            </>
          )}
          <AddBlogForm token={user.token} setNotification={setNotification}/>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </>
      )}
    </div>
  );
};

export default App;
