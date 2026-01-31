import { useEffect } from "react";
import { useNavigate } from "react-router";

export function useCheckLogin() {
  let navigate = useNavigate();
  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return;
      }

      try {
        const result = await fetch("http://localhost:3000/user-api/user", {
          method: "GET",
          headers: {
            Authorization: `bearer ${token}`,
          },
        });

        // If logged in
        if (result.ok) {
          navigate("/");
          return;
        }
      } catch (error) {
        console.log("check login error" + error);
      }
    };

    checkAuth();
  }, [navigate]);
}
