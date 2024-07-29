import React from "react";
import { FaPlay } from "react-icons/fa";

const PlayButton = (props) => {
  return (
    <div>
      <button
        className="px-6 py-2 text-white font-semibold bg-brightColor hover:shadow-xl transition-all rounded-full flex items-center"
        onClick={props.onClick}
      >
        <FaPlay size={18} className="mr-2" /> {props.title}
      </button>
    </div>
  );
};

export default PlayButton;
