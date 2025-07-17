import React, { useState } from 'react';
import Board from './Board';
import '../styles/Game.css';

// Helper function to calculate winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6] // Diagonals
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
};

// AI move calculation
const calculateAIMove = (squares) => {
  // Find empty squares
  const emptySquares = squares.reduce((acc, square, index) => {
    if (!square) acc.push(index);
    return acc;
  }, []);
  
  // Choose random empty square
  return emptySquares[Math.floor(Math.random() * emptySquares.length)];
};

// PUBLIC_INTERFACE
const Game = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [scores, setScores] = useState({ X: 0, O: 0 });
  const [isSinglePlayer, setIsSinglePlayer] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(square => square);

  const handleClick = (i) => {
    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    const newSquares = squares.slice();
    newSquares[i] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    
    if (!calculateWinner(newSquares)) {
      setIsXNext(!isXNext);
      
      // AI move in single player mode
      if (isSinglePlayer && !isXNext) {
        setTimeout(() => {
          const aiMove = calculateAIMove(newSquares);
          if (aiMove !== undefined) {
            const aiSquares = newSquares.slice();
            aiSquares[aiMove] = 'O';
            setSquares(aiSquares);
            setIsXNext(true);
          }
        }, 500);
      }
    } else {
      // Update scores
      const winner = calculateWinner(newSquares);
      setScores(prev => ({
        ...prev,
        [winner]: prev[winner] + 1
      }));
    }
  };

  const resetGame = () => {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  };

  const resetScores = () => {
    setScores({ X: 0, O: 0 });
    resetGame();
  };

  const toggleGameMode = () => {
    setIsSinglePlayer(!isSinglePlayer);
    resetGame();
  };

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = 'Draw!';
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  return (
    <div className="game">
      <div className="game-info">
        <h1>Tic Tac Toe</h1>
        <div className="scoreboard">
          <div className="score">
            <span>Player X</span>
            <span className="score-number">{scores.X}</span>
          </div>
          <div className="score">
            <span>Player O</span>
            <span className="score-number">{scores.O}</span>
          </div>
        </div>
        <div className="status">{status}</div>
      </div>
      
      <Board squares={squares} onClick={handleClick} />
      
      <div className="game-controls">
        <button 
          className="control-btn mode-btn" 
          onClick={toggleGameMode}
        >
          {isSinglePlayer ? 'Switch to 2 Players' : 'Switch to Single Player'}
        </button>
        <button 
          className="control-btn"
          onClick={resetGame}
        >
          Reset Game
        </button>
        <button 
          className="control-btn"
          onClick={resetScores}
        >
          Reset Scores
        </button>
      </div>
    </div>
  );
};

export default Game;
