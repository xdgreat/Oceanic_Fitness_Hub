import React, { useState } from "react";
import open from "../assets/svg/menu.svg";
import close from "../assets/svg/x.svg";

const Hamburger = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menu = isOpen ? close : open;
  function handleMenuClick() {
    setIsOpen(!isOpen);
  }

  return <img src={menu} alt="menu" onClick={handleMenuClick} />;
};

export default Hamburger;
