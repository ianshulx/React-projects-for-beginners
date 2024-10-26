import "./App.css";
import { useEffect, useState, useCallback } from "react";

function App() {
  const [stringOfWords, setStringOfWords] = useState("");
  const [charsTyped, setCharsTyped] = useState(-1); // Stores the index upto which the chars have been typed
  const [timeElapsed, setTimeElapsed] = useState(0); // Stores time in seconds
  const [isTimerTicking, setIsTimerTicking] = useState(false);

  const clearInput = () => (document.getElementById("input").value = "");

  const handleKeyStroke = (event) => {
    const key = event.nativeEvent.data;
    if (key != null) {
      if (charsTyped == -1) setTimeElapsed(0);
      setIsTimerTicking(true);
      if (key == stringOfWords[charsTyped + 1]) {
        setCharsTyped((charsTyped) => charsTyped + 1);
      }
      if (charsTyped + 2 == stringOfWords.length) setIsTimerTicking(false);
    }

    if (charsTyped + 1 == stringOfWords.length) {
      clearInput();
    }
  };

  const refreshWords = useCallback(() => {
    fetch(`https://random-word-api.herokuapp.com/word?number=10`)
      .then((res) => res.json())
      .then((data) => setStringOfWords(data.join(" ")));

    setCharsTyped(-1);
    clearInput();
    setIsTimerTicking(false);
  }, []);

  useEffect(() => {
    refreshWords();
  }, [refreshWords]);

  useEffect(() => {
    const interval = setInterval(() => {
      isTimerTicking && setTimeElapsed((timeElapsed) => timeElapsed + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeElapsed, isTimerTicking]);

  return (
    <>
      <h1 style={{fontFamily: 'sans-serif'}}>TYPING SPEED TESTER </h1>
      <span style={{margin: '20px'}} >{stringOfWords}</span>
      <button onClick={refreshWords}> Refresh</button>
      <div style={{margin: '10px'}}>
        {timeElapsed == 0
          ? 0
          : Math.round(((charsTyped + 1) / timeElapsed) * 12)}{" "}
        WPM
      </div>
      <br />
      <input
        id="input"
        onChange={(e) => handleKeyStroke(e)}
        style={{ height: "25px", width: "900px" }}
        type="text"
      />
    </>
  );
}

export default App;