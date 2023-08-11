import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/LoginButton";

const Login = () => {
  useEffect(() => {
    document.title = "Login | Oceanic Fitness Hub";
  });
  return (
    <div>
      <Navbar />
      <BottomNav />
    </div>
  );
};

export default Login;
