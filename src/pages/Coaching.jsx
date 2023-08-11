import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

const Coaching = () => {
  useEffect(() => {
    document.title = "Coaching | Oceanic Fitness Hub";
  });
  return (
    <div>
      <Navbar />
      Coaching
      <BottomNav />
    </div>
  );
};

export default Coaching;
