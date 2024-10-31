import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [length, setLength] = useState(10);
  const [numAllowed, setNumAllowed] = useState(true);
  const [charAllowed, setCharAllowed] = useState(true);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*/~";

    for (let index = 1; index <= length; index++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass = pass + str.charAt(char);
    }

    setPassword(pass);
  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  const passwordRef = useRef(null);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();

    window.navigator.clipboard.writeText(password); // copy krne ka tarika
  }, [password]);

  return (
    <div className="w-full max-w-xl mx-auto shadow-md rounded-lg px-8 py-6 my-20 bg-gray-800 text-orange-500">
      <h1 className="text-4xl text-white text-center mb-10 mt-2">
        Password generator
      </h1>
      <div className="flex shadow rounded-lg overflow-hidden mb-7">
        <input
          type="text"
          value={password}
          className="outline-none w-full text-lg py-2 px-4 placeholder:text-lg"
          placeholder="Password"
          readOnly
          ref={passwordRef}
        />
        <button
          onClick={copyPasswordToClipboard}
          className="outline-none bg-blue-700 text-white px-5 text-lg hover:bg-blue-800 transition-all duration-350 hover:scale-110"
        >
          Copy
        </button>
      </div>
      <div className="flex text-lg gap-10">
        <div className="flex items-center gap-x-1">
          <input
            type="range"
            min={6}
            max={50}
            value={length}
            className="hover:bg-blue-700 transition-all duration-350 cursor-pointer hover:scale-110"
            onChange={(e) => {
              setLength(e.target.value);
            }}
          />
          <label className="px-1">Length: {length}</label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            className="hover:bg-blue-700 transition-all duration-350 hover:scale-125"
            type="checkbox"
            defaultChecked={numAllowed}
            id="numberInput"
            onChange={() => {
              setNumAllowed((prev) => !prev);
            }}
          />
          <label className="px-1" htmlFor="numberInput">
            Numbers
          </label>
        </div>
        <div className="flex items-center gap-x-1">
          <input
            className="hover:bg-blue-700 transition-all duration-350 hover:scale-125"
            type="checkbox"
            defaultChecked={charAllowed}
            id="characterInput"
            onChange={() => {
              setCharAllowed((prev) => !prev);
            }}
          />
          <label className="px-1" htmlFor="characterInput">
            Characters
          </label>
        </div>
      </div>
    </div>
  );
}

export default App;
