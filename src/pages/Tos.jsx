import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

const Tos = () => {
  useEffect(() => {
    document.title = "Tos | Oceanic Fitness Hub";
  });
  return (
    <div>
      <Navbar />
      Tos
      <BottomNav />
    </div>
  );
};

export default Tos;
