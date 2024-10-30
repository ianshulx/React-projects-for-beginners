// src/components/Countdown.jsx
import React, { useState, useEffect } from 'react';

const Countdown = () => {
  const [birthday, setBirthday] = useState('');
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let interval;

    if (isActive) {
      interval = setInterval(() => {
        calculateTimeLeft();
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, birthday]);

  const calculateTimeLeft = () => {
    const today = new Date();
    const nextBirthday = new Date(today.getFullYear(), birthday.getMonth(), birthday.getDate());

    // If the birthday has already passed this year, set it for next year
    if (nextBirthday < today) {
      nextBirthday.setFullYear(today.getFullYear() + 1);
    }

    const timeDifference = nextBirthday - today;

    const days = Math.floor(timeDifference / (1000 * 3600 * 24));
    const hours = Math.floor((timeDifference % (1000 * 3600 * 24)) / (1000 * 3600));
    const minutes = Math.floor((timeDifference % (1000 * 3600)) / (1000 * 60));
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

    setTimeLeft({ days, hours, minutes, seconds });
  };

  const handleBirthdayChange = (e) => {
    setBirthday(new Date(e.target.value));
  };

  const handleStartCountdown = (e) => {
    e.preventDefault();
    if (birthday) {
      setIsActive(true);
      calculateTimeLeft(); // Initial calculation
    }
  };

  const handleReset = () => {
    setBirthday('');
    setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    setIsActive(false);
  };

  return (
    <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg text-center">
      <h1 className="text-3xl font-bold mb-6">Countdown to Your Birthday</h1>

      <form onSubmit={handleStartCountdown} className="mb-6">
        <input
          type="date"
          value={birthday ? birthday.toISOString().substring(0, 10) : ''}
          onChange={handleBirthdayChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Start Countdown
        </button>
      </form>

      {isActive && (
        <div className="text-2xl font-semibold">
          <div className="flex justify-around mb-4">
            <div>
              <span className="block text-blue-600">{timeLeft.days}</span>
              <span className="text-gray-500">Days</span>
            </div>
            <div>
              <span className="block text-blue-600">{timeLeft.hours}</span>
              <span className="text-gray-500">Hours</span>
            </div>
            <div>
              <span className="block text-blue-600">{timeLeft.minutes}</span>
              <span className="text-gray-500">Minutes</span>
            </div>
            <div>
              <span className="block text-blue-600">{timeLeft.seconds}</span>
              <span className="text-gray-500">Seconds</span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="mt-6 px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default Countdown;
