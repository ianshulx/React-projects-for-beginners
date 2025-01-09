import { useEffect, useState } from "react";
import "./index.css";

function App() {
  const [inputWord, setInputWord] = useState("");
  const [result, setResult] = useState(null);

  useEffect(() => {
  }, []);

  const fetchDetail = () => {
    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`)
      .then((response) => response.json())
      .then((data) => {
        const resultHtml = `
          <div className="result">
            <div className="word">
              <h3>${inputWord}</h3>
            </div>
            <div className="details">
              <p>${data[0].meanings[0].partOfSpeech}</p>
              <p>${data[0].phonetic}</p>
            </div>
            <p className='word-meaning'>
              ${data[0].meanings[0].definitions[0].definition}
            </p>
            <p className='word-exp'>${
              data[0].meanings[0].definitions[0].example || " "
            }</p>
          </div>`;
        setResult(resultHtml);
      })
      .catch(() => {
        setResult(`<h3 className='error'>Could not find</h3>`);
      });
  };

  return (
    <>
      <div className="container">
        <div className="search-box">
          <input
            type="text"
            value={inputWord}
            onChange={(e) => setInputWord(e.target.value)}
            placeholder="Type the word here"
            id="input-word"
          />
          <button
            className="btn"
            onClick={() => {
              if (inputWord.trim() === "") {
                alert("Please enter a word");
              } else {
                fetchDetail();
              }
            }}
          >
            Search
          </button>
        </div>
        {result && <div dangerouslySetInnerHTML={{ __html: result }} />}
      </div>
    </>
  );
}

export default App;

