// src/components/WeightConverter.jsx
import React, { useState } from 'react';

const WeightConverter = () => {
  const [weight, setWeight] = useState('');
  const [unit, setUnit] = useState('kg'); // Default to kilograms
  const [convertedWeight, setConvertedWeight] = useState('');

  const convertWeight = (e) => {
    e.preventDefault();
    let result;

    if (unit === 'kg') {
      result = (weight * 2.20462).toFixed(2); // Convert kg to pounds
    } else {
      result = (weight / 2.20462).toFixed(2); // Convert pounds to kg
    }

    setConvertedWeight(result);
  };

  const handleReset = () => {
    setWeight('');
    setConvertedWeight('');
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold mb-4">Weight Converter</h1>
      
      <form onSubmit={convertWeight} className="mb-4">
        <div className="mb-4">
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter weight"
            required
          />
        </div>

        <div className="mb-4">
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="kg">Kilograms</option>
            <option value="lb">Pounds</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Convert
        </button>
      </form>

      {convertedWeight && (
        <div>
          <p className="text-lg font-semibold">
            Converted Weight: {convertedWeight} {unit === 'kg' ? 'lbs' : 'kg'}
          </p>
          <button
            onClick={handleReset}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default WeightConverter;
