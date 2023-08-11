import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import BottomNav from "../components/BottomNav";
import { useAuth0 } from "@auth0/auth0-react";

const About = () => {
  useEffect(() => {
    document.title = "About | Oceanic Fitness Hub";
  });

  const { isAuthenticated } = useAuth0();
  console.log(isAuthenticated);

  return (
    <div>
      <Navbar />
      About
      {isAuthenticated ? <h1>hi</h1> : <h1>bye</h1>}
      <BottomNav />
    </div>
  );
};

export default About;
