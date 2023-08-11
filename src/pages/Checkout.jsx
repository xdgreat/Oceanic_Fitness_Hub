import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

const Checkout = () => {
  useEffect(() => {
    document.title = "Checkout | Oceanic Fitness Hub";
  });
  return (
    <div>
      s
      <Navbar />
      Checkout
      <BottomNav />
    </div>
  );
};

export default Checkout;
