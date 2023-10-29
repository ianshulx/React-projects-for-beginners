import React from "react";

// import components
import Nav from "./Nav";
import AccountBtns from "./AccountBtns";

// import logo
import Logo from "../assets/img/logo.svg";

// import icons
import { CgMenuRight } from "react-icons/cg";

const Header = ({ setNavMobile }) => {
  return (
    <header
      className="py-[30px] lg:pt-[60px]"
      data-aos="fade-down"
      data-aos-delay="900"
      data-aos-duration="2000"
    >
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <a href="#">
          <img src={Logo} alt="" />
        </a>
        {/* nav and btns */}
        <div className="hidden lg:flex gap-x-[55px]">
          <Nav />
          <AccountBtns />
        </div>
        {/* open nav btn */}
        <div
          onClick={() => setNavMobile(true)}
          className="lg:hidden cursor-pointer"
        >
          <CgMenuRight className="text-2xl"></CgMenuRight>
        </div>
      </div>
    </header>
  );
};

export default Header;
