import React from "react";

const CustomRange = ({ value, onChange, onClick, onDragStart, onDragEnd }) => {
  return (
    <input
      type="range"
      min="0"
      max="100"
      step="0.1"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      onClick={onClick}
      onMouseDown={onDragStart}
      onMouseUp={onDragEnd}
      onTouchStart={onDragStart}
      onTouchEnd={onDragEnd}
      className="w-full h-1 appearance-none bg-gray-200 rounded-full outline-none range"
      style={{
        background: `linear-gradient(to right, #00ff00 ${value}%, #ccc ${value}%)`,
      }}
    />
  );
};

export default CustomRange;
