// import styles from "./Register.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useCheckLogin } from "../../hooks/useCheckLogin";
import { useOutletContext } from "react-router-dom";

import { API_URL } from "../config";

function Register() {
  const { setAuth } = useOutletContext();
  useCheckLogin(setAuth);
  useEffect(() => {
    // Passed into component, therefore not logged in
    setAuth(false);
  }, [setAuth]);

  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function updateUsername(e) {
    setUsername(e.target.value);
  }

  function updatePassword(e) {
    setPassword(e.target.value);
  }

  async function makeRegisterAttempt() {
    try {
      const result = await fetch(`${API_URL}/user-api/register`, {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (result.ok) {
        // redirect to login
        navigate("/login");
      } else {
        // Could throw here instead
        console.log("Register failure");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div>Register</div>
      <form>
        <label>
          Username
          <input type="text" value={username} onChange={updateUsername} />
        </label>
        <label>
          Password
          <input type="text" value={password} onChange={updatePassword} />
        </label>
        <button type="button" onClick={makeRegisterAttempt}>
          Register
        </button>
      </form>
    </>
  );
}

export default Register;
