// src/components/FruitMatcher.jsx
import React, { useState, useEffect } from 'react';

const fruits = ["🍎", "🍌", "🍓", "🍒", "🍍", "🍉", "🍇", "🥝"];
const shuffledFruits = [...fruits, ...fruits].sort(() => Math.random() - 0.5);

const FruitMatcher = () => {
  const [tiles, setTiles] = useState(shuffledFruits.map(fruit => ({ fruit, matched: false })));
  const [selected, setSelected] = useState([]);
  const [score, setScore] = useState(0);

  const handleTileClick = (index) => {
    if (selected.length === 2 || tiles[index].matched || selected.includes(index)) return;

    const newSelected = [...selected, index];
    setSelected(newSelected);

    if (newSelected.length === 2) {
      const [first, second] = newSelected;
      if (tiles[first].fruit === tiles[second].fruit) {
        const updatedTiles = tiles.map((tile, idx) =>
          newSelected.includes(idx) ? { ...tile, matched: true } : tile
        );
        setTiles(updatedTiles);
        setScore(score + 1);
      }
      setTimeout(() => setSelected([]), 500);
    }
  };

  const resetGame = () => {
    setTiles(shuffledFruits.map(fruit => ({ fruit, matched: false })));
    setScore(0);
    setSelected([]);
  };

  return (
    <div className="text-center">
      <h1 className="text-2xl font-bold mb-4">Fruit Matcher Game</h1>
      <p className="mb-4 text-lg">Score: {score}</p>
      
      <div className="grid grid-cols-4 gap-3 mb-6">
        {tiles.map((tile, idx) => (
          <button
            key={idx}
            className={`w-20 h-20 rounded-lg flex items-center justify-center text-4xl ${
              tile.matched || selected.includes(idx) ? 'bg-green-200' : 'bg-yellow-200'
            }`}
            onClick={() => handleTileClick(idx)}
          >
            {tile.matched || selected.includes(idx) ? tile.fruit : "❓"}
          </button>
        ))}
      </div>

      <button
        onClick={resetGame}
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Restart Game
      </button>
    </div>
  );
};

export default FruitMatcher;
