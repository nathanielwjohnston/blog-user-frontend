// import styles from "./Navbar.module.css";

import { Link } from "react-router";

function Navbar({ auth, user }) {
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
        {auth && <Link to="/logout">Log out</Link>}
      </span>
      {/* Links: home, logout (login, register depending) */}
    </>
  );
}

export default Navbar;
