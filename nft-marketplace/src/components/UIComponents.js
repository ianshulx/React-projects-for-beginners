// UIComponents.js

import React from 'react';

export const Button = ({ onClick, children }) => (
  <button
    onClick={onClick}
    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-500 focus:outline-none"
  >
    {children}
  </button>
);

export const Input = ({ placeholder, value, onChange }) => (
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="border border-gray-300 p-2 rounded mb-2 w-full focus:outline-none focus:border-purple-500"
  />
);

export const Card = ({ title, children }) => (
  <div className="bg-white shadow-md rounded p-4 mb-4">
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    {children}
  </div>
);