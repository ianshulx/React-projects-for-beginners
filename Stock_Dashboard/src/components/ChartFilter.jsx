import React from "react";

const ChartFilter = ({ text, active, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`w-12 m-2 h-8 border-1 rounded-md flex items-center justify-center cursor-pointer ${
        active
          ? "bg-indigo-600 border-indigo-700 text-gray-100"
          : "border-indigo-300 text-indigo-300"
      } transition duration-200 hover:bg-indigo-600 hover:text-gray-100 hover:border-indigo-700`}
    >
      {text}
    </button>
  );
};

export default ChartFilter;
