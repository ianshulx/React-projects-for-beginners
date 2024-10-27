// src/components/ui/badge.js
import React from 'react';

const Badge = ({ text, variant = 'primary' }) => {
  const baseStyles = "inline-flex items-center px-3 py-1 rounded-full font-semibold text-sm";
  const variants = {
    primary: "bg-blue-500 text-white",
    secondary: "bg-gray-500 text-white",
    success: "bg-green-500 text-white",
    danger: "bg-red-500 text-white",
    warning: "bg-yellow-500 text-black",
  };

  return <span className={`${baseStyles} ${variants[variant]}`}>{text}</span>;
};

export default Badge;
