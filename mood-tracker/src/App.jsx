// Install Tailwind and set up in your React app by following Tailwind's installation instructions.

// App.js
import React, { useState } from 'react';

const App = () => {
  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  const moods = ["😃 Happy", "😐 Neutral", "😢 Sad", "😡 Angry", "🤔 Confused"];

  const [moodHistory, setMoodHistory] = useState({});

  const handleMoodSelect = (day, mood) => {
    setMoodHistory((prev) => ({ ...prev, [day]: mood }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-50 p-6">
      <h1 className="text-3xl font-bold mb-4 text-blue-600">Mood Tracker</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {daysOfWeek.map((day) => (
          <div key={day} className="bg-white p-4 shadow-md rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-gray-800">{day}</h2>
            <div className="flex flex-wrap gap-2">
              {moods.map((mood) => (
                <button
                  key={mood}
                  onClick={() => handleMoodSelect(day, mood)}
                  className={`px-2 py-1 rounded-full text-white ${moodHistory[day] === mood ? 'bg-blue-600' : 'bg-blue-400 hover:bg-blue-500'}`}
                >
                  {mood}
                </button>
              ))}
            </div>
            <div className="mt-4">
              <p className="text-gray-700">Selected Mood:</p>
              <p className="text-2xl">{moodHistory[day] || "None"}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 w-full max-w-lg bg-white p-4 shadow-md rounded-lg">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Mood History</h2>
        <ul className="space-y-2">
          {Object.entries(moodHistory).map(([day, mood]) => (
            <li key={day} className="flex justify-between text-gray-700">
              <span className="font-medium">{day}:</span>
              <span>{mood}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
