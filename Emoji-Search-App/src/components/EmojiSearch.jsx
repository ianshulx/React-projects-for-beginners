// src/components/EmojiSearch.jsx
import React, { useState } from 'react';

const emojiList = [
  { symbol: '😀', name: 'Grinning Face' },
  { symbol: '😂', name: 'Face with Tears of Joy' },
  { symbol: '❤️', name: 'Red Heart' },
  { symbol: '🔥', name: 'Fire' },
  { symbol: '🎉', name: 'Party Popper' },
  { symbol: '🍕', name: 'Pizza' },
  { symbol: '🚀', name: 'Rocket' },
  { symbol: '🌈', name: 'Rainbow' },
  { symbol: '🎶', name: 'Musical Notes' },
  { symbol: '⚽️', name: 'Soccer Ball' },
  // Add more emojis as needed
];

const EmojiSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredEmojis = emojiList.filter((emoji) =>
    emoji.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold mb-4">Emoji Search</h1>

      <input
        type="text"
        placeholder="Search for an emoji..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="grid grid-cols-3 gap-4">
        {filteredEmojis.map((emoji) => (
          <div
            key={emoji.symbol}
            className="p-4 border rounded-lg hover:bg-gray-100 text-2xl"
          >
            <span>{emoji.symbol}</span>
            <p className="text-sm mt-1">{emoji.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmojiSearch;
