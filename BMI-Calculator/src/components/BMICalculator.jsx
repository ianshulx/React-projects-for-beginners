// src/components/BMICalculator.jsx
import React, { useState } from 'react';

const BMICalculator = () => {
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [bmi, setBMI] = useState(null);
  const [message, setMessage] = useState('');

  const calculateBMI = (e) => {
    e.preventDefault();
    if (height && weight) {
      const bmiValue = (weight / (height * height)).toFixed(2);
      setBMI(bmiValue);
      if (bmiValue < 18.5) {
        setMessage('Underweight');
      } else if (bmiValue < 24.9) {
        setMessage('Normal weight');
      } else if (bmiValue < 29.9) {
        setMessage('Overweight');
      } else {
        setMessage('Obese');
      }
    } else {
      setMessage('Please enter valid height and weight');
    }
  };

  const resetForm = () => {
    setHeight('');
    setWeight('');
    setBMI(null);
    setMessage('');
  };

  return (
    <div className="w-full max-w-sm p-6 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-2xl font-bold mb-4">BMI Calculator</h1>
      
      <form onSubmit={calculateBMI} className="mb-4">
        <div className="mb-4">
          <label className="block text-left font-medium text-gray-700 mb-1">Height (meters)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            step="0.01"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 1.75"
            required
          />
        </div>
        
        <div className="mb-6">
          <label className="block text-left font-medium text-gray-700 mb-1">Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            step="0.1"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 70"
            required
          />
        </div>
        
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Calculate BMI
        </button>
      </form>

      {bmi && (
        <div>
          <p className="text-lg font-semibold">Your BMI: {bmi}</p>
          <p className="text-md mt-2">{message}</p>
          <button
            onClick={resetForm}
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default BMICalculator;
