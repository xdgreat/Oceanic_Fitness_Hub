import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

const Personal = () => {
  useEffect(() => {
    document.title = "Personal | Oceanic Fitness Hub";
  });

  return (
    <div>
      <Navbar />
      <BottomNav />
    </div>
  );
};

export default Personal;
