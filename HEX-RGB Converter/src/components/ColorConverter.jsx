// src/components/ColorConverter.jsx
import React, { useState } from 'react';

const hexToRgb = (hex) => {
  if (!/^#([0-9A-F]{3}){1,2}$/i.test(hex)) return null;
  let color = hex.substring(1).split('');
  if (color.length === 3) color = [color[0], color[0], color[1], color[1], color[2], color[2]];
  const r = parseInt(color[0] + color[1], 16);
  const g = parseInt(color[2] + color[3], 16);
  const b = parseInt(color[4] + color[5], 16);
  return `rgb(${r}, ${g}, ${b})`;
};

const rgbToHex = (rgb) => {
  const result = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  if (!result) return null;
  return `#${((1 << 24) + (parseInt(result[1]) << 16) + (parseInt(result[2]) << 8) + parseInt(result[3]))
    .toString(16)
    .slice(1)
    .toUpperCase()}`;
};

const ColorConverter = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');

  const handleConvert = () => {
    let result;
    if (input.startsWith('#')) {
      result = hexToRgb(input);
    } else if (input.startsWith('rgb')) {
      result = rgbToHex(input);
    } else {
      result = 'Invalid format!';
    }
    setOutput(result || 'Invalid color!');
  };

  return (
    <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">HEX/RGB Color Converter</h1>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter HEX (#RRGGBB) or RGB (rgb(r, g, b))"
        className="w-full p-3 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleConvert}
        className="w-full py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Convert
      </button>
      {output && (
        <p className="mt-4 text-lg font-medium">
          Converted Color: <span style={{ color: output }}>{output}</span>
        </p>
      )}
    </div>
  );
};

export default ColorConverter;
