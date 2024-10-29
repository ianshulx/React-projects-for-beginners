// src/components/WaterTracker.jsx
import React, { useState } from 'react';

const WaterTracker = () => {
  const [intake, setIntake] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000); // 2 liters in milliliters
  const [waterAmount, setWaterAmount] = useState('');

  const handleInputChange = (e) => {
    setWaterAmount(e.target.value);
  };

  const handleLogIntake = (e) => {
    e.preventDefault();
    const amount = parseInt(waterAmount, 10);
    if (!isNaN(amount) && amount > 0) {
      setIntake((prevIntake) => Math.min(prevIntake + amount, dailyGoal));
      setWaterAmount('');
    }
  };

  const handleReset = () => {
    setIntake(0);
    setWaterAmount('');
  };

  const percentage = (intake / dailyGoal) * 100;

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold mb-6">Water Intake Tracker</h1>
      <p className="text-lg mb-4">Daily Goal: {dailyGoal / 1000} L</p>
      <div className="mb-4">
        <div className="relative w-full h-6 bg-gray-200 rounded-full">
          <div
            className="absolute h-full bg-blue-500 rounded-full"
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
        <p className="text-sm mt-1">{intake / 1000} L / {dailyGoal / 1000} L</p>
      </div>

      <form onSubmit={handleLogIntake} className="mb-4">
        <input
          type="number"
          value={waterAmount}
          onChange={handleInputChange}
          placeholder="Amount (mL)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Log Intake
        </button>
      </form>

      <button
        onClick={handleReset}
        className="mt-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
      >
        Reset Intake
      </button>
    </div>
  );
};

export default WaterTracker;
