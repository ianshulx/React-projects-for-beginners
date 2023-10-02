import { useState } from "react";
import { Logo, Punch, Globe } from "./icons";
import Search from "./Search";
import Button from "./common/Button";

const textMenus = [
  { name: "WHO WE ARE", href: "" },
  { name: "WORK WITH US", href: "" },
  { name: "NEWS", href: "" },
];

const NavBar = () => {
  const [logoColor, setLogoColor] = useState("#ffffff");

  const handleMouseEnter = () => {
    setLogoColor("#ff0000");
  };

  const handleMouseLeave = () => {
    setLogoColor("#ffffff");
  };

  return (
    <nav className="absolute top-0 z-10 flex items-start justify-between pt-7 px-8 w-[100%] text-white">
      <div className="flex items-center gap-2 left-nav">
        <div className="flex mr-8 gap-7">
          <Logo
            logoColor={logoColor}
            handleMouseEnter={handleMouseEnter}
            handleMouseLeave={handleMouseLeave}
          />

          <Punch />
        </div>

        {textMenus.map((menu) => (
          <div className="text-menus">{menu.name}</div>
        ))}
      </div>

      <div className="flex items-center gap-2 text-white right-nav font-primary">
        <Globe />

        <Search />

        <Button buttonTitle="SIGN IN" />
      </div>
    </nav>
  );
};

export default NavBar;
