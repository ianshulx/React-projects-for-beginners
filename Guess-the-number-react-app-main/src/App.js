import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import NumberInput from './components/NumberInput';
import ResultMessage from './components/ResultMessage';
import Button from './components/Button';
import './App.css';
const App = () => {
  const [secretNumber, setSecretNumber] = useState(Math.floor(Math.random() * 25) + 1);
  const [message, setMessage] = useState('');
  const [count, setCount] = useState(0);
  const maxCount = 5;

  useEffect(() => {
    if (count === maxCount) {
      setMessage('You have reached the maximum number of guesses!');
      setHasWon(false);
    }
  }, [count]);

  const remainingAttempts = maxCount - count;
  const [hasWon, setHasWon] = useState(false);

  const handleGuess = (value) => {
    const guessNum = parseInt(value);
    setCount(count + 1);
    if (count < maxCount) {
      if (guessNum === secretNumber) {
        setMessage('Congratulations! You guessed it right!');
        setHasWon(true);

      }
      else if (guessNum > secretNumber){
        setMessage('Your guess is too high. Try again!'); 
      }
      else {
        setMessage(`You Guess Too low. Try again!`);
      }
    }
  };

  const resetGame = () => {
    setSecretNumber(Math.floor(Math.random() * 20) + 1);
    setMessage('');
    setCount(0);
    setHasWon(false);
  };

  return (
    <>
    <Header />
    <div className={`container ${hasWon ? 'win' : ''}`}>
      <div className="card">
        <div className="content">
          <NumberInput onSubmit={handleGuess} />
          <ResultMessage message={message} />
          {(count === maxCount || hasWon) && (
             <Button onClick={resetGame} text="Restart Game" />
           )}
        </div>
        <div className="attempts">
          <p>Remaining attempts: {remainingAttempts}</p>
        </div>
      </div>
    </div>
    </>
  );
};

export default App;
