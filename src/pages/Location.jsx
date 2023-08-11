import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

const Location = () => {
  useEffect(() => {
    document.title = "Location | Oceanic Fitness Hub";
  });
  return (
    <div>
      <Navbar />
      Location
      <BottomNav />
    </div>
  );
};

export default Location;
