import React, { useState } from "react";
import TextToSpeech from "./components/TextToSpeech";

const App = () => {
  const [text, setText] = useState("");

  return (
    <div className="flex flex-col gap-10 items-center justify-center h-screen">
      <h1 className="font-bold text-4xl text-white">
        Text to Speech Converter
      </h1>
      <TextToSpeech text={text} />

      <textarea
        id="editor"
        rows="8"
        className="block w-[70%] rounded p-2 text-lg text-gray-800 bg-white border-0 placeholder-gray-400 placeholder:text-lg outline-purple-700"
        placeholder="Please enter your text to select voices...."
        onChange={(e) => setText(e.target.value)}
        required
      ></textarea>
    </div>
  );
};

export default App;
