import { useState, useEffect, useRef } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import LoginForm from "./components/LoginForm";
import AddBlogForm from "./components/AddBlogForm";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState();
  const [notification, setNotification] = useState();

  const addBlogRef = useRef();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    setUser(JSON.parse(user));
    setNotification({
      message: "login successful",
      isError: false,
    });
    setTimeout(() => {
      setNotification(undefined);
    }, 5000);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedInUser");
    setNotification({
      message: "logout successful",
      isError: false,
    });
    setUser("");
    setTimeout(() => {
      setNotification(undefined);
    }, 5000);
  };
  console.log("blog: ", blogs[0], "user: ", user);

  return (
    <div>
      {!user && (
        <LoginForm setUser={setUser} setNotification={setNotification} />
      )}
      {user && (
        <>
          <h2>blogs</h2>
          {notification && (
            <Notification
              message={notification.message}
              isError={notification.isError}
            />
          )}
          {user && (
            <>
              <p style={{ display: "inline-block" }}>
                {user.name} is logged in
              </p>
              <button onClick={handleLogout}>logout</button>
            </>
          )}
          <Togglable ref={addBlogRef}>
            <AddBlogForm
              addBlogRef={addBlogRef}
              token={user.token}
              setNotification={setNotification}
            />
          </Togglable>
          {blogs
            .sort((a, b) => a.likes - b.likes)
            .map((blog) => (
              <Blog key={blog.id} blog={blog} user={user} />
            ))}
        </>
      )}
    </div>
  );
};

export default App;
