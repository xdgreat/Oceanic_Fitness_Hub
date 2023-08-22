import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

const About = () => {
  useEffect(() => {
    document.title = "About | Oceanic Fitness Hub";
  });

  return (
    <div>
      <Navbar />
      About
      <BottomNav />
    </div>
  );
};

export default About;
