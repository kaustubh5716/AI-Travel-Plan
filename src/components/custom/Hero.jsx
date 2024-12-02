import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="flex flex-col items-center gap-9">
      <div className="relative w-full">
        <img
          src="Home-Page.jpg"
          className="object-cover w-full h-[450px] md:h-[550px] shadow-lg"
          alt="Discover your next adventure"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-75"></div>
        <div className="absolute bottom-5 left-5 text-white text-4xl font-bold max-w-[80%] leading-tight">
          Start Your Adventure<br /> Like Never Before
        </div>
      </div>
      <h1 className="font-extrabold text-[50px] text-center mt-10 px-5">
        <span className="text-[#f56551]">
          Discover Your Next Adventure with AI:
        </span>{" "}
        Personalize Itineraries at Your Fingertips
      </h1>
      <p className="text-xl text-gray-500 text-center px-5 max-w-4xl">
        Your personal trip planner and travel curator, creating custom itineraries
        tailored to your interests and budget.
      </p>
      <Link to={"/create-trip"}>
        <Button className="px-6 py-3 text-lg mb-[100px]">Get Started, It's Free</Button>
      </Link>
    </div>
  );
};

export default Hero;
