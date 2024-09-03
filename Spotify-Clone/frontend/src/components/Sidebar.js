// import React, { useState } from "react";
import logo from "../img/logo.svg";
import { Icon } from "../Icons";
import Menu from "../components/Sidebar/Menu";
import Playlists from "../components/Sidebar/Playlists";
import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <aside className={`w-60 pt-6 flex flex-shrink-0 flex-col bg-black`}>
      <Link to="#" className="mb-7 px-6">
        <img src={logo} alt="" className="h-10" />
      </Link>

      <Menu />

      <nav className="mt-6">
        <ul>
          <li>
            <Link
              to="#"
              className="py-2 px-6 flex items-center group text-sm text-gray-500 font-semibold hover:text-white"
            >
              <span className="w-6 h-6 flex items-center justify-center mr-4 bg-white bg-opacity-60 group-hover:bg-opacity-100 rounded-sm text-black">
                <Icon name="plus" size={12} />
              </span>
              Create a Playlist
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="py-2 px-6 flex items-center group text-sm text-gray-500 font-semibold hover:text-white"
            >
              <span className="w-6 h-6 flex items-center justify-center mr-4 bg-gradient-to-br from-purple-700 text-white rounded-sm to-blue-300 opacity-70 group-hover:opacity-100">
                <Icon name="heartFilled" size={12} />
              </span>
              Liked Songs
            </Link>
          </li>
        </ul>
      </nav>

      <Playlists />
    </aside>
  );
}

export default Sidebar;
