import React from "react";
import hero from "../assets/svg/hero.svg";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <section className=" flex flex-wrap items-start justify-center py-12  xl:gap-24 ">
      <div className=" w-fit sm:my-10  md:my-14  lg:my-20  xl:my-24  2xl:my-24 ">
        <h1 className="text w-[25rem] px-4 text-center text-5xl font-bold sm:px-0 sm:text-center md:px-0 md:text-start lg:px-0 lg:text-start xl:px-0 xl:text-start 2xl:px-0 ">
          Track Your Fitness Journey
        </h1>
        <p className="my-6 w-[25rem] px-4 text-center text-xl sm:px-0 sm:text-center md:px-0 md:text-start lg:px-0 lg:text-start xl:px-0 xl:text-start 2xl:px-0">
          Your all-in-one fitness companion for a healthier lifestyle. Join now
          and start tracking your workouts, nutrition, and progress with ease
        </p>
        <div className="flex items-center justify-center gap-6 md:items-start md:justify-start">
          <Link
            to={"/login"}
            className="rounded bg-primary p-2 text-xl text-clrWhite transition-all hover:scale-105"
          >
            Get Started Now
          </Link>
          <Link
            to={"/"}
            className="rounded bg-secondary p-2 text-xl text-text transition-all hover:scale-105"
          >
            Explore Features
          </Link>
        </div>
      </div>
      <img
        src={hero}
        alt="hero image"
        className=" mt-24 w-[650px] sm:w-[350px] md:w-[450px] lg:w-[500px]"
      />
    </section>
  );
};

export default Hero;
