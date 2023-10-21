import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

const Me = () => {
  const [userData, getUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  useEffect(() => {
    document.title = "User | Oceanic Fitness Hub";

    async function tryUserInfo() {
      try {
        const getUser = await fetch("/api/me").then((res) =>
          res.json().then((data) => getUserData(data))
        );

        console.log(data);
      } catch (err) {
        console.log(err);
      }
    }

    tryUserInfo();
  }, []);
  return (
    <div>
      <Navbar />
      User
      <BottomNav />
    </div>
  );
};

export default Me;
