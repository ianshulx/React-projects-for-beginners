import React from "react";
import img from "../assets/img/about.svg";
import Button from "../layouts/Button";

const About = () => {
  return (
    <div className=" min-h-screen flex flex-col items-center justify-center lg:px-32 px-5 bg-backgroundColor">
      <h1 className=" font-semibold text-center text-4xl lg:mt-14 mt-24 mb-8">About Us</h1>

      <div className=" flex flex-col lg:flex-row items-center gap-5">
        <div className=" w-full lg:w-2/4">
          <img className=" rounded-lg" src={img} alt="img" />
        </div>
        <div className=" w-full lg:w-2/4 p-4 space-y-3">
          <h2 className=" font-semibold text-3xl ">
            Special of Myth Weaver
          </h2>
          <p className="text-textColor">
          Myth Weaver is an AI story generator. In a few seconds, you will get your own story based on the keywords and prompts you enter.
          </p>
          <p className="text-textColor">
          It is very easy to do, and we have created a simple tool to help you create your own story. This tool is very useful and will give you a story of just 60 words. You can quickly generate engaging content with minimal effort.
          </p>

          <Button title="Learn More" />
        </div>
      </div>
    </div>
  );
};

export default About;
