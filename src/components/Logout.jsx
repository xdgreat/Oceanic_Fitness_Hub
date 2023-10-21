import React from "react";
import { useContext } from "react";
import { StoreContext } from "../store";

const LogoutButton = () => {
  const [{ auth, loginResponse }, dispatch] = useContext(StoreContext);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "GET",
      });

      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Logout failed");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
    //   dispatch({
    //     type: "LOGOUT",
    //   });
    //   console.log(loginResponse);
  };

  return (
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
};

export default LogoutButton;
