// Navbar.js

import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/logo" className="text-lg font-bold text-white">
          BloodBank.com
        </a>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <a href="/" className="text-white hover:text-red-500 hover:underline">
            Home
          </a>
          <a
            href="/donate"
            className="text-white hover:text-red-500 hover:underline"
          >
            Donor
          </a>
          <a
            href="/aboutus"
            className="text-white hover:text-red-500 hover:underline"
          >
            About us
          </a>
          {/* <a
            href="/profile"
            className="text-white hover:text-red-500 hover:underline"
          >
            Profile
          </a> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
