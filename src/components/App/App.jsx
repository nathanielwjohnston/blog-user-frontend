// import styles from "./App.module.css";

import { Outlet } from "react-router";
import { useState } from "react";
import { useCheckLogin } from "../../hooks/useCheckLogin";

import Navbar from "../Navbar/Navbar";

function App() {
  const [auth, setAuth] = useState(false);
  useCheckLogin(setAuth);

  const user = localStorage.getItem("user");

  return (
    <>
      <Navbar auth={auth} user={user} />
      <div>App</div>
      <Outlet context={{ setAuth }} />
    </>
  );
}

export default App;
