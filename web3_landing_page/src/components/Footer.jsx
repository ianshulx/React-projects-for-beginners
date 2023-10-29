import React from "react";

// import images
import Logo from "../assets/img/logo.svg";
import VisaImg from "../assets/img/visa.png";
import MastercardImg from "../assets/img/mastercard.png";
import BitcoinImg from "../assets/img/bitcoin.png";

// import icons
import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoLinkedin,
  IoLogoYoutube,
} from "react-icons/io";

const Footer = () => {
  return (
    <footer className="lg:pt-24 pt-0" data-aos="fade-up" data-aos-offset="400">
      <div className="container mx-auto lg:mb-24">
        <div className="flex flex-col gap-12 lg:flex-row ">
          {/* logo */}
          <div className="flex-1 mx-auto lg:mx-0 mb-6 max-w-[285px]">
            <a href="#">
              <img src={Logo} alt="" />
            </a>
          </div>
          {/* link groups */}
          <div className="flex flex-1 flex-col gap-16 lg:flex-row">
            {/* link group */}
            <div className="text-center w-full lg:text-left">
              <div className="text-xl font-medium mb-6">Quick Links</div>
              <ul className="space-y-4 text-gray">
                <li>
                  <a className="hover:text-blue transition" href="#">
                    Home
                  </a>
                </li>
                <li>
                  <a className="hover:text-blue transition" href="#">
                    Products
                  </a>
                </li>
                <li>
                  <a className="hover:text-blue transition" href="#">
                    About
                  </a>
                </li>
                <li>
                  <a className="hover:text-blue transition" href="#">
                    Features
                  </a>
                </li>
                <li>
                  <a className="hover:text-blue transition" href="#">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div className="text-center w-full lg:text-left">
              <div className="text-xl font-medium mb-6">Resources Links</div>
              <ul className="space-y-4 text-gray">
                <li>
                  <a className="hover:text-blue transition" href="#">
                    Download Whitepaper
                  </a>
                </li>
                <li>
                  <a className="hover:text-blue transition" href="#">
                    Smart Token
                  </a>
                </li>
                <li>
                  <a className="hover:text-blue transition" href="#">
                    Blockchain Explore
                  </a>
                </li>
                <li>
                  <a className="hover:text-blue transition" href="#">
                    Crypto API
                  </a>
                </li>
                <li>
                  <a className="hover:text-blue transition" href="#">
                    Interest
                  </a>
                </li>
              </ul>
            </div>
          </div>
          {/* link group */}

          {/* payment */}
          <div className="flex flex-col flex-1">
            <div className="lg:ml-[80px]">
              <h3 className="h3 font-medium text-center mb-10 lg:text-left">
                We accept following payment systems
              </h3>
              <div className="flex justify-center items-center gap-6">
                <img src={VisaImg} alt="" />
                <img src={MastercardImg} alt="" />
                <img src={BitcoinImg} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* copy & socials */}
      <div className="py-12">
        <div className="container mx-auto flex flex-col items-center gap-y-6 lg:flex-row lg:justify-between lg:gap-y-0">
          {/* copy text */}
          <div>&copy; 2022 CRAPPO. All rights reserved.</div>
          {/* social icons */}
          <div className="flex text-2xl gap-x-8">
            <a className="hover:text-blue transition" href="#">
              <IoLogoYoutube />
            </a>
            <a className="hover:text-blue transition" href="#">
              <IoLogoInstagram />
            </a>
            <a className="hover:text-blue transition" href="#">
              <IoLogoTwitter />
            </a>
            <a className="hover:text-blue transition" href="#">
              <IoLogoLinkedin />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
