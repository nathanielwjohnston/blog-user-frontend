// import styles from "./Login.module.css";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useCheckLogin } from "../../hooks/useCheckLogin";

function Login() {
  useCheckLogin();

  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function updateUsername(e) {
    setUsername(e.target.value);
  }

  function updatePassword(e) {
    setPassword(e.target.value);
  }

  async function makeLoginAttempt() {
    try {
      const res = await fetch("http://localhost:3000/user-api/login", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        const result = await res.json();
        // set token
        localStorage.setItem("token", result.token);
        // redirect to home
        // NOTE: was having issues with redirecting
        // when rendering, but technically the component
        // has been rendered by this point
        // We are just calling a function from a rendered point
        navigate("/");
      } else {
        console.log("Login failure");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>Login</div>
      <form>
        <label>
          Username
          <input type="text" value={username} onChange={updateUsername} />
        </label>
        <label>
          Password
          <input type="text" value={password} onChange={updatePassword} />
        </label>
        <button type="button" onClick={makeLoginAttempt}>
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
