// import styles from "./ErrorPage.module.css";

import { useRouteError } from "react-router";

function ErrorPage() {
  const error = useRouteError();
  return (
    <>
      <div>Error Page - {error.message}</div>
    </>
  );
}

export default ErrorPage;
