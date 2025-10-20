import { useState } from "react";
import login from "../services/login";
import loginServices from "../services/login";

const LoginForm = ({ setUser, setNotification }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = async e => {
    e.preventDefault();
    const results = await login.loginUser({username, password});
    setUser(results);
    loginServices.setToken(results.token);
    localStorage.setItem("loggedInUser", JSON.stringify(results));
    setUsername("");
    setPassword("");
    setNotification({
      message: "login successful",
      isError: false
    })
    setTimeout(() => {
      setNotification(undefined);
    }, 5000)
  }
  return (
    <form onSubmit={handleOnSubmit}>
      <label style={{ display: "block", marginBottom: 5 }}>
        username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)}/>
      </label>
      <label style={{ display: "block", marginBottom: 5 }}>
        password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)}/>
      </label>
      <button>login</button>
    </form>
  );
};

export default LoginForm;
