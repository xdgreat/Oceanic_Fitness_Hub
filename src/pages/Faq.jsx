import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

const Faq = () => {
  useEffect(() => {
    document.title = "FAQ | Oceanic Fitness Hub";
  });
  return (
    <div>
      <Navbar />
      Faq
      <BottomNav />
    </div>
  );
};

export default Faq;
