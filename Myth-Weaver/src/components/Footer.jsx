import React from "react";

const Footer = () => {
  return (
    <div className=" bg-gradient-to-r from-[#fbeffe] to-[#e5f1fd] text-black  mt-8 md:mt-0">
      <div className="flex flex-col md:flex-row justify-between p-8 md:px-32 px-5">
        <div className=" w-full md:w-1/4">
          <h1 className=" font-semibold text-xl pb-4">Myth Weaver</h1>
          <p className=" text-sm">
          Myth Weaver is an AI story generator. In a few seconds, you will get your own story based on the keywords and prompts you enter. It is very easy to use, and we have created a simple tool to help you create your own story. This tool is very useful and will give you a story of just 60 words.
          </p>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Links</h1>
          <nav className=" flex flex-col gap-2">
            <a
              className=" hover:text-brightColor transition-all cursor-pointer"
              href="/"
            >
              About Us
            </a>
            <a
              className=" hover:text-brightColor transition-all cursor-pointer"
              href="/"
            >
              Dev's
            </a>
          </nav>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Dev's</h1>
          <nav className=" flex flex-col gap-2">
            <a
              className=" hover:text-brightColor transition-all cursor-pointer"
              href="https://github.com/shweta1817"
            >
              Shweta Bandawane
            </a>
            <a
              className=" hover:text-brightColor transition-all cursor-pointer"
              href="https://github.com/mrravipandee"
            >
              Ravi Pandey
            </a>
            <a
              className=" hover:text-brightColor transition-all cursor-pointer"
              href="https://github.com/JejurkarYash"
            >
              Yash Jejurkar
            </a>
          </nav>
        </div>
        <div>
          <h1 className=" font-medium text-xl pb-4 pt-5 md:pt-0">Contact Us</h1>
          <nav className=" flex flex-col gap-2">
            <a
              className=" hover:text-brightColor transition-all cursor-pointer"
              href="/"
            >
              imravipanday@gmail.com
            </a>
            <a
              className=" hover:text-brightColor transition-all cursor-pointer"
              href="/"
            >
              +91 70585 48204
            </a>
            <a
              className=" hover:text-brightColor transition-all cursor-pointer"
              href="https://mrravipandee.bio.link/"
            >
              Social media
            </a>
          </nav>
        </div>
      </div>
      <div>
        <p>
          <p className=" text-center py-4">
            © 2024
            <span className=" text-brightColor">
              {" "}
              Myth Weaver {" "}
            </span>
            | All rights reserved
          </p>
        </p>
      </div>
    </div>
  );
};

export default Footer;
