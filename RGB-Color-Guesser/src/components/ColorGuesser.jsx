// src/components/ColorGuesser.jsx
import React, { useState, useEffect } from 'react';

const generateRandomColor = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
};

const ColorGuesser = () => {
  const [targetColor, setTargetColor] = useState('');
  const [options, setOptions] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    const newTargetColor = generateRandomColor();
    const newOptions = [newTargetColor, generateRandomColor(), generateRandomColor()]
      .sort(() => Math.random() - 0.5);
    setTargetColor(newTargetColor);
    setOptions(newOptions);
    setMessage('');
  };

  const handleGuess = (color) => {
    if (color === targetColor) {
      setMessage('Correct! 🎉');
    } else {
      setMessage('Try Again! 😅');
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold mb-4">Guess the Color</h1>
      <div className="text-lg mb-6">RGB Code: <span className="font-mono font-bold">{targetColor}</span></div>
      
      <div className="flex justify-around mb-6">
        {options.map((color, index) => (
          <button
            key={index}
            onClick={() => handleGuess(color)}
            style={{ backgroundColor: color }}
            className="w-20 h-20 rounded-full border-2 border-gray-300 transition-transform hover:scale-105"
          />
        ))}
      </div>

      <div className="text-lg mb-4">{message}</div>
      <button
        onClick={resetGame}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded hover:bg-blue-600"
      >
        New Game
      </button>
    </div>
  );
};

export default ColorGuesser;
