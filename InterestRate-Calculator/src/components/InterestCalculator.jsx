// src/components/InterestCalculator.jsx
import React, { useState } from 'react';

const InterestCalculator = () => {
  const [principal, setPrincipal] = useState('');
  const [rate, setRate] = useState('');
  const [time, setTime] = useState('');
  const [interestType, setInterestType] = useState('simple');
  const [result, setResult] = useState(null);

  const calculateInterest = () => {
    const P = parseFloat(principal);
    const R = parseFloat(rate) / 100;
    const T = parseFloat(time);

    if (isNaN(P) || isNaN(R) || isNaN(T)) {
      setResult("Please enter valid inputs.");
      return;
    }

    let interest;
    if (interestType === 'simple') {
      interest = P * R * T;
    } else {
      interest = P * (Math.pow((1 + R), T) - 1);
    }

    setResult(interest.toFixed(2));
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Interest Rate Calculator</h1>
      
      <div className="mb-4">
        <label className="block text-gray-700">Principal Amount (P)</label>
        <input
          type="number"
          value={principal}
          onChange={(e) => setPrincipal(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded"
          placeholder="Enter principal amount"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Rate of Interest (R) %</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded"
          placeholder="Enter interest rate"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Time (T) in Years</label>
        <input
          type="number"
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded"
          placeholder="Enter time period"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Interest Type</label>
        <select
          value={interestType}
          onChange={(e) => setInterestType(e.target.value)}
          className="w-full p-2 mt-2 border border-gray-300 rounded"
        >
          <option value="simple">Simple Interest</option>
          <option value="compound">Compound Interest</option>
        </select>
      </div>

      <button
        onClick={calculateInterest}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Calculate
      </button>

      {result !== null && (
        <div className="mt-4 p-4 bg-green-100 rounded text-green-800 font-semibold">
          Interest: {result}
        </div>
      )}
    </div>
  );
};

export default InterestCalculator;
