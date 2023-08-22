import React, { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import Hero from "./components/Hero";
function App() {
  useEffect(() => {
    document.title = "Home | Oceanic Fitness Hub";

    const fetchUsers = async () => {
      fetch("/api/allusers", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => console.log(data));
    };
    fetchUsers();
  });

  return (
    <>
      <Navbar />
      <Hero />
      hi
      <BottomNav />
    </>
  );
}

export default App;
