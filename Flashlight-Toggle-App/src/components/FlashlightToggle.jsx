// src/components/FlashlightToggle.jsx
import React, { useState } from 'react';

const FlashlightToggle = () => {
  const [isOn, setIsOn] = useState(false);

  const toggleFlashlight = () => setIsOn(!isOn);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center">
        {/* Bulb */}
        <div
          className={`relative w-24 h-40 mx-auto mb-8 transition-transform duration-300 ease-in-out ${
            isOn ? 'scale-105' : 'scale-100'
          }`}
        >
          {/* Bulb Glass */}
          <div
            className={`absolute inset-0 rounded-full bg-yellow-300 ${
              isOn ? 'opacity-90 shadow-[0px_0px_30px_15px_rgba(255,223,72,0.8)]' : 'opacity-50'
            }`}
          />
          
          {/* Bulb Bottom (Socket) */}
          <div className="absolute bottom-0 w-full h-8 bg-gray-800 rounded-b-md" />

          {/* Wires */}
          <div className="absolute top-0 w-1 h-10 bg-yellow-500 left-1/2 transform -translate-x-1/2" />
        </div>

        {/* Toggle Button */}
        <button
          onClick={toggleFlashlight}
          className={`mt-6 px-6 py-3 rounded-full text-lg font-semibold shadow-lg transition-transform duration-300 transform hover:scale-105 ${
            isOn ? 'bg-yellow-500 text-gray-900' : 'bg-gray-700 text-white'
          }`}
        >
          {isOn ? 'Turn Off' : 'Turn On'}
        </button>
      </div>
    </div>
  );
};

export default FlashlightToggle;
