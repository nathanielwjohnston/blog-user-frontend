import App from "./components/App/App.jsx";
import ErrorPage from "./components/ErrorPage/ErrorPage.jsx";
import Home from "./components/Home/Home.jsx";
import Login from "./components/Login/Login.jsx";
import Post from "./components/Post/Post.jsx";
import Register from "./components/Register/Register.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "/posts/:postId",
        element: <Post />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "login",
        element: <Login />,
      },
    ],
  },
];

export default routes;
