import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

const Refund = () => {
  useEffect(() => {
    document.title = "Refund | Oceanic Fitness Hub";
  });
  return (
    <div>
      <Navbar />
      Refund
      <BottomNav />
    </div>
  );
};

export default Refund;
