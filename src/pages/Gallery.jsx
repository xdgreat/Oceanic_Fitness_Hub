import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

const Gallery = () => {
  useEffect(() => {
    document.title = "Gallery | Oceanic Fitness Hub";
  });
  return (
    <div>
      <Navbar />
      Gallery
      <BottomNav />
    </div>
  );
};

export default Gallery;
