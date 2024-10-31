import React, { useState, useEffect, useRef } from "react";

const TypingSpeedTest = () => {
  const [text, setText] = useState(
    "Test your typing speed with this simple app. Type the text as quickly and accurately as you can."
  );
  const [input, setInput] = useState("");
  const [startTime, setStartTime] = useState(null);
  const [timer, setTimer] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    let interval = null;
    if (startTime && !isFinished) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else if (isFinished) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [startTime, isFinished]);

  // Calculate WPM every 30 seconds
  useEffect(() => {
    if (timer % 30 === 0 && timer > 0 && !isFinished) {
      calculateWPM();
    }
  }, [timer, isFinished]);

  const calculateWPM = () => {
    if (startTime) {
      const durationInMinutes = (Date.now() - startTime) / 60000;
      const wordsTyped = input
        .trim()
        .split(" ")
        .filter((word) => word).length;
      setWpm(
        durationInMinutes > 0 ? Math.round(wordsTyped / durationInMinutes) : 0
      );
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (!startTime) setStartTime(Date.now());
    setInput(value);
  };

  const handleFinish = () => {
    setIsFinished(true);
    calculateWPM();
  };

  const handleRestart = () => {
    setInput("");
    setStartTime(null);
    setTimer(0);
    setWpm(0);
    setIsFinished(false);
    inputRef.current.focus();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-5">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Typing Speed Test
      </h1>
      <p className="text-gray-600 max-w-xl mb-8 text-center">{text}</p>
      <textarea
        ref={inputRef}
        value={input}
        onChange={handleChange}
        disabled={isFinished}
        className="w-full max-w-xl p-4 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 mb-4 resize-none"
        placeholder="Start typing here..."
        rows="5"
      />
      <div className="flex items-center space-x-4 mb-8">
        <p className="text-lg text-gray-700">
          <strong>Time:</strong> {timer} seconds
        </p>
        <p className="text-lg text-gray-700">
          <strong>WPM:</strong> {wpm > 0 ? wpm : "Typing..."}
        </p>
      </div>
      <div className="flex space-x-4">
        <button
          onClick={isFinished ? handleRestart : handleFinish}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          {isFinished ? "Restart" : "Finish"}
        </button>
        <button
          onClick={calculateWPM}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
        >
          Calculate WPM
        </button>
      </div>
    </div>
  );
};

export default TypingSpeedTest;
