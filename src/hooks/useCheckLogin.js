import { useEffect } from "react";
import { useNavigate } from "react-router";

export function useCheckLogin(setAuth) {
  let navigate = useNavigate();

  useEffect(() => {
    // Sets auth to true, if api check fails it will
    // be set to false in parent component
    setAuth(true);
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuth(false);
        return;
      }

      try {
        const res = await fetch("http://localhost:3000/user-api/user", {
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
          },
        });

        // If logged in
        if (res.ok) {
          const result = await res.json();
          localStorage.setItem("user", JSON.stringify(result.user));
          navigate("/");
          return;
        }
        setAuth(false);
      } catch (error) {
        console.log("check login error" + error);
        setAuth(false);
      }
    };

    checkAuth();
  }, [navigate, setAuth]);
}
