import React, { useState } from 'react';

const NumberInput = ({ onSubmit }) => {
  const [guess, setGuess] = useState('');

  const handleChange = (e) => {
    setGuess(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (guess && !isNaN(guess)) {
      onSubmit(guess);
      setGuess('');
    } else {
      alert("Please enter a valid number.");
    }
  };
  

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="number"
        value={guess}
        onChange={handleChange}
        placeholder="Enter your guess"
        className='inputfield'
      />
      <button type="submit" className='button'>Submit</button>
    </form>
  );
};

export default NumberInput;
