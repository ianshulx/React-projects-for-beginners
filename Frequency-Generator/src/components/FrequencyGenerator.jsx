// src/components/FrequencyGenerator.jsx
import React, { useState, useEffect } from 'react';

const FrequencyGenerator = () => {
  const [frequency, setFrequency] = useState(440);
  const [audioCtx, setAudioCtx] = useState(null);
  const [oscillator, setOscillator] = useState(null);

  // Start the oscillator and set the frequency
  const startSound = () => {
    if (!audioCtx || !oscillator) {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(frequency, ctx.currentTime);
      osc.connect(ctx.destination);
      osc.start();
      setAudioCtx(ctx);
      setOscillator(osc);
    } else {
      oscillator.frequency.setValueAtTime(frequency, audioCtx.currentTime);
    }
  };

  // Stop the oscillator
  const stopSound = () => {
    if (oscillator) {
      oscillator.stop();
      setOscillator(null);
      setAudioCtx(null);
    }
  };

  useEffect(() => {
    return () => {
      stopSound();
    };
  }, [oscillator]);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg text-center mt-10">
      <h1 className="text-3xl font-bold mb-6 text-gray-700">Frequency Generator</h1>
      <p className="text-gray-500 text-sm mb-8">Generate a pure sine wave tone at any frequency!</p>

      <div className="mb-4">
        <label htmlFor="frequency" className="block text-lg font-semibold mb-3 text-gray-600">
          Frequency: <span className="text-blue-600">{frequency} Hz</span>
        </label>
        
        {/* Frequency Slider */}
        <input
          type="range"
          id="frequency"
          min="20"
          max="20000"
          step="1"
          value={frequency}
          onChange={(e) => setFrequency(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg cursor-pointer accent-blue-500"
        />
      </div>

      {/* Start/Stop Buttons */}
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={startSound}
          className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg shadow transition duration-200"
        >
          Start Tone
        </button>
        
        <button
          onClick={stopSound}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-lg shadow transition duration-200"
        >
          Stop Tone
        </button>
      </div>
    </div>
  );
};

export default FrequencyGenerator;
