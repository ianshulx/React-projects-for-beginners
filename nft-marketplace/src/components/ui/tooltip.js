// src/components/ui/tooltip.js
import React from 'react';

// TooltipProvider (if necessary, depends on your specific needs)
export const TooltipProvider = ({ children }) => <div>{children}</div>;

// Tooltip Trigger
export const TooltipTrigger = ({ children }) => (
  <div className="group inline-block">{children}</div>
);

// Tooltip Content
export const TooltipContent = ({ text }) => (
  <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-700 text-white text-sm rounded-md opacity-0 transition-opacity duration-300 group-hover:opacity-100">
    {text}
  </div>
);

// Tooltip Component
const Tooltip = ({ text, children }) => (
  <div className="relative group inline-block">
    {children}
    <TooltipContent text={text} />
  </div>
);

export default Tooltip;
