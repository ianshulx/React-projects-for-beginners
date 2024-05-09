import React from 'react';

const Button = ({ onClick, text }) => {
  return (
    <button onClick={onClick} className="button">
      {text}
    </button>
  );
};

export default Button;
