import React, { useEffect, useContext } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import BottomNav from "./components/BottomNav";
import Hero from "./components/Hero";

function App() {
  useEffect(() => {
    document.title = "Home | Oceanic Fitness Hub";
  }, []);
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
