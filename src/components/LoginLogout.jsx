import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../store";
import { Link } from "react-router-dom";
import LogoutButton from "./Logout";

const LoginLogout = () => {
  const [{ isLoggedRes }, dispatch] = useContext(StoreContext);
  useEffect(() => {
    dispatch({
      type: "ISLOGGEDIN",
    });
  }, []);
  if (isLoggedRes === undefined) {
    return null;
  }
  return (
    <>
      {isLoggedRes.isLogged ? (
        <LogoutButton />
      ) : (
        <Link to={"/login"}>Login</Link>
      )}
    </>
  );
};

export default LoginLogout;
