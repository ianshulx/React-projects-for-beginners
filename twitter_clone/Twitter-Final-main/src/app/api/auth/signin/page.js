"use client";
import React from "react";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
const page = async () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="border p-8 flex items-center justify-center space-x-8 shadow-md bg-white">
        <div className="mr-8 pr-8 border-r border-gray-300">
          <img
            src="https://cdn0.iconfinder.com/data/icons/popular-social-media-colored/48/JD-14-512.png"
            alt="twitter in a phone"
            className="md:inline-flex object-cover md:w-44 rotate-6 h-80"
          />
        </div>
        <div className="text-center flex flex-col items-center">
          <img
            className={
              "w-[10em] h-[10em] hoverEffect p-0 hover:bg-blue-100 xl:px-1"
            }
            src={
              "https://help.twitter.com/content/dam/help-twitter/brand/logo.png"
            }
            alt="twitter logo"
            priority
          ></img>
          <button
            onClick={() => {
              signIn("google", { callbackUrl: "/" });
            }}
            className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
          >
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default page;
