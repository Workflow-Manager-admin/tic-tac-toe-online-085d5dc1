import React from 'react';
import '../styles/Square.css';

// PUBLIC_INTERFACE
const Square = ({ value, onClick }) => {
  return (
    <button 
      className={`square ${value ? 'filled' : ''}`} 
      onClick={onClick}
      disabled={value ? true : false}
    >
      {value}
    </button>
  );
};

export default Square;
