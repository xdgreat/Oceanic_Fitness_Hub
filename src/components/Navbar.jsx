import React, { useState } from "react";
import "../App.css";
import Hamburger from "./Hamburger";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <nav className="sticky top-0 flex w-full items-center justify-between  bg-clrWhite px-3 py-6 shadow-sm">
        <button
          onClick={handleDropdownToggle}
          className="sm:block md:block lg:hidden xl:hidden 2xl:hidden"
        >
          <Hamburger />
        </button>
        <Link
          to={"/"}
          className="flex flex-1 items-center justify-center uppercase"
        >
          Oceanic Fitness Hub
        </Link>
        <Link to={"/login"} className="flex items-center">
          Login
        </Link>
        {isDropdownOpen && (
          <div className=" text-md absolute left-0 top-16 flex w-full flex-col flex-wrap items-start bg-clrWhite text-start">
            <Link
              to="/"
              className="border-black mt-4 block w-full border-b border-t  border-solid p-4 uppercase"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="border-black block w-full border-b border-solid  p-4 uppercase"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="border-black block w-full border-b border-solid  p-4 uppercase"
            >
              Contact
            </Link>
            <Link
              to="/coaching"
              className="border-black block w-full border-b border-solid  p-4 uppercase"
            >
              Coaching
            </Link>
            <Link
              to="/personal"
              className="border-black block w-full border-b border-solid  p-4 uppercase"
            >
              Personal
            </Link>
            <Link
              to="/gallery"
              className="border-black block w-full border-b border-solid  p-4 uppercase"
            >
              Gallery
            </Link>
            <Link
              to="/location"
              className="border-black block w-full border-b border-solid  p-4 uppercase"
            >
              Location
            </Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Navbar;
