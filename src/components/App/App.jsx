// import styles from "./App.module.css";

import { Outlet } from "react-router";
import { useState } from "react";
import { useCheckLogin } from "../../hooks/useCheckLogin";

import Navbar from "../Navbar/Navbar";

function App() {
  const [auth, setAuth] = useState(false);
  useCheckLogin(setAuth);

  // TODO: if auth is false, clear user and token?

  const user = localStorage.getItem("user");

  return (
    <>
      <Navbar auth={auth} user={user} setAuth={setAuth} />
      <div>App</div>
      <Outlet context={{ setAuth, auth }} />
    </>
  );
}

export default App;
