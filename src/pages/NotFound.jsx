import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

const NotFound = () => {
  useEffect(() => {
    document.title = "Not Found | Oceanic Fitness Hub";
  });
  return (
    <div>
      <Navbar />
      not found
      <BottomNav />
    </div>
  );
};

export default NotFound;
