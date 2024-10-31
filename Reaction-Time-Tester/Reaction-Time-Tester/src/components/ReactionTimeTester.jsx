// src/components/ReactionTimeTester.jsx
import React, { useState, useEffect } from 'react';

const ReactionTimeTester = () => {
  const [status, setStatus] = useState("idle"); // idle, waiting, timing, tooSoon
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [color, setColor] = useState("bg-blue-500");

  const startTest = () => {
    setStatus("waiting");
    setColor("bg-red-500");
    setReactionTime(null);
    
    const delay = Math.floor(Math.random() * 2000) + 2000; // Random delay 2-4 seconds
    setTimeout(() => {
      setColor("bg-green-500");
      setStartTime(Date.now());
      setStatus("timing");
    }, delay);
  };

  const handleClick = () => {
    if (status === "waiting") {
      setStatus("tooSoon");
      setColor("bg-red-600");
      setReactionTime("Too Soon! Click to retry.");
    } else if (status === "timing") {
      const endTime = Date.now();
      const time = endTime - startTime;
      setReactionTime(`${time} ms`);
      setStatus("finished");
      setColor("bg-blue-500");
    }
  };

  const resetTest = () => {
    setStatus("idle");
    setColor("bg-blue-500");
    setReactionTime(null);
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Reaction Time Tester</h1>
      
      <div
        onClick={handleClick}
        className={`w-80 h-80 flex items-center justify-center cursor-pointer text-white text-3xl font-semibold rounded-lg ${color}`}
      >
        {status === "idle" && "Start"}
        {status === "waiting" && "Wait..."}
        {status === "timing" && "Click!"}
        {status === "tooSoon" && "Too Soon!"}
        {status === "finished" && reactionTime}
      </div>
      
      {status === "idle" || status === "finished" ? (
        <button
          onClick={startTest}
          className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
        >
          Start Test
        </button>
      ) : (
        <button
          onClick={resetTest}
          className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600"
        >
          Reset
        </button>
      )}
    </div>
  );
};

export default ReactionTimeTester;
