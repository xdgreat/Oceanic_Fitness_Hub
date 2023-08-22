import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";

const Contact = () => {
  useEffect(() => {
    document.title = "Contact | Oceanic Fitness Hub";
  }, []);

  return (
    <div>
      <Navbar />
      Contact
      <BottomNav />
    </div>
  );
};

export default Contact;
