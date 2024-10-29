// src/components/DestinationSuggester.jsx
import React, { useState } from 'react';

const DestinationSuggester = () => {
  const [destination, setDestination] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getRandomDestination = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await fetch(`https://restcountries.com/v3.1/all`);
      const data = await response.json();

      if (data && data.length > 0) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const country = data[randomIndex];
        setDestination(`${country.name.common}, ${country.subregion}`);
      } else {
        setError("No destinations found");
      }
    } catch (err) {
      setError("Failed to fetch destination. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold mb-6">Travel Destination Suggester</h1>
      <p className="text-lg mb-4">
        {loading ? "Loading..." : destination ? `How about visiting: ${destination}` : "Click the button to get a suggestion!"}
      </p>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <button
        onClick={getRandomDestination}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Suggest a Destination
      </button>
    </div>
  );
};

export default DestinationSuggester;
