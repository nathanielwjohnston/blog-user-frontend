// import styles from "./Navbar.module.css";

import { Link } from "react-router";
import { useNavigate } from "react-router";

import { API_URL } from "../config";

function Navbar({ auth, user, setAuth }) {
  let navigate = useNavigate();

  async function logout() {
    try {
      const token = localStorage.getItem("token");
      const result = await fetch(`${API_URL}/user-api/logout`, {
        method: "POST",
        headers: {
          Authorization: `bearer ${token}`,
        },
      });

      if (result.ok) {
        localStorage.setItem("token", "");
        localStorage.setItem("user", {});
        setAuth(false);
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <h4>Navbar</h4>
      <span>
        {auth && <span>Hi, {JSON.parse(user).username}!</span>}
        <Link to="/">Home</Link>
        {!auth && (
          <span>
            <Link to="/login">Log in</Link>
            <Link to="/register">Register</Link>
          </span>
        )}
        {auth && (
          <Link to="/" onClick={logout}>
            Log out
          </Link>
        )}
      </span>
    </>
  );
}

export default Navbar;
