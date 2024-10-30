// src/components/FunFactGenerator.jsx
import React, { useState } from 'react';

const FunFactGenerator = () => {
  const [fact, setFact] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchFunFact = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://uselessfacts.jsph.pl/random.json?language=en');
      const data = await response.json();
      setFact(data.text);
    } catch (error) {
      setFact("Couldn't fetch a fact. Try again!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">Random Fun Fact</h1>
      <p className="text-gray-600 italic mb-6">{fact || "Click the button to get a fun fact!"}</p>
      <button
        onClick={fetchFunFact}
        className="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
      >
        {loading ? "Loading..." : "Get Fun Fact"}
      </button>
    </div>
  );
};

export default FunFactGenerator;
