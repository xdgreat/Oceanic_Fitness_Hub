import React from "react";
import home from "../assets/svg/home.svg";
import personal from "../assets/svg/personal.svg";
import checklist from "../assets/svg/checklist.svg";
import hat from "../assets/svg/hat.svg";
import { Link } from "react-router-dom";
const BottomNav = () => {
  return (
    <section className="outline-black fixed bottom-0 left-1/2 flex w-screen max-w-lg -translate-x-1/2 transform items-center justify-evenly   bg-clrWhite shadow-md  sm:bottom-2 sm:rounded-full  md:bottom-2 lg:bottom-2 lg:rounded-full xl:bottom-2">
      <Link to={"/"}>
        <img
          src={home}
          alt=""
          className="sm:w-13 lg:w-15 w-[3.5rem] p-2  hover:rounded-full hover:bg-background md:w-14 xl:w-16 2xl:w-16  "
        />
      </Link>
      <Link to={"personal"}>
        <img
          src={personal}
          alt=""
          className="sm:w-13 lg:w-15 w-[3.5rem] p-2 hover:rounded-full hover:bg-background md:w-14 xl:w-16 2xl:w-16 "
        />
      </Link>
      <Link to={"/personal"}>
        <img
          src={checklist}
          alt=""
          className="sm:w-13 lg:w-15 w-[3.5rem] p-2 hover:rounded-full hover:bg-background md:w-14 xl:w-16 2xl:w-16 "
        />
      </Link>
      <Link to={"/personal"}>
        <img
          src={hat}
          alt=""
          className="sm:w-13 lg:w-15 w-[3.5rem] p-2 hover:rounded-full hover:bg-background md:w-14 xl:w-16 2xl:w-16 "
        />
      </Link>
    </section>
  );
};

export default BottomNav;
