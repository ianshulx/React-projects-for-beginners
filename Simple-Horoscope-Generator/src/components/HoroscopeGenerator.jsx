// src/components/HoroscopeGenerator.jsx
import React, { useState } from 'react';
import axios from 'axios';

const zodiacSigns = [
  { name: 'Aries', symbol: '♈' },
  { name: 'Taurus', symbol: '♉' },
  { name: 'Gemini', symbol: '♊' },
  { name: 'Cancer', symbol: '♋' },
  { name: 'Leo', symbol: '♌' },
  { name: 'Virgo', symbol: '♍' },
  { name: 'Libra', symbol: '♎' },
  { name: 'Scorpio', symbol: '♏' },
  { name: 'Sagittarius', symbol: '♐' },
  { name: 'Capricorn', symbol: '♑' },
  { name: 'Aquarius', symbol: '♒' },
  { name: 'Pisces', symbol: '♓' },
];

const HoroscopeGenerator = () => {
  const [selectedSign, setSelectedSign] = useState('');
  const [horoscope, setHoroscope] = useState(null);
  const [error, setError] = useState('');

  const fetchHoroscope = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/horoscope/${selectedSign.toLowerCase()}`);
      setHoroscope(response.data.horoscope);
      setError('');
    } catch (error) {
      console.error('Fetching error:', error);
      setError('Failed to fetch horoscope. Please try again later.');
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold mb-4">Daily Horoscope</h1>

      <select
        value={selectedSign}
        onChange={(e) => setSelectedSign(e.target.value)}
        className="w-full px-3 py-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select your zodiac sign</option>
        {zodiacSigns.map((sign) => (
          <option key={sign.name} value={sign.name}>
            {sign.symbol} {sign.name}
          </option>
        ))}
      </select>

      <button
        onClick={fetchHoroscope}
        disabled={!selectedSign}
        className="px-4 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
      >
        Get Horoscope
      </button>

      {error && <div className="text-red-500 mt-4">{error}</div>}
      {horoscope && (
        <div className="mt-6 p-4 bg-gray-100 rounded-lg">
          <p className="text-lg font-semibold">{selectedSign}</p>
          <p className="mt-2">{horoscope}</p>
        </div>
      )}
    </div>
  );
};

export default HoroscopeGenerator;
