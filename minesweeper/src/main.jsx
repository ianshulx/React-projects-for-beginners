import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { emptyBoard, placeMines, reveal, MINES, SIZE } from './game.js';
import './style.css';

function App() {
  const [board, setBoard] = useState(emptyBoard);
  const [status, setStatus] = useState('ready');
  const [flagMode, setFlagMode] = useState(false);
  const flags = board.filter(cell => cell.flagged).length;
  const finished = status === 'won' || status === 'lost';

  function restart() {
    setBoard(emptyBoard());
    setStatus('ready');
    setFlagMode(false);
  }

  function toggleFlag(index) {
    if (finished || board[index].revealed) return;
    if (!board[index].flagged && flags >= MINES) return;
    setBoard(board.map((cell, i) => i === index ? { ...cell, flagged: !cell.flagged } : cell));
  }

  function openCell(index) {
    if (finished || board[index].revealed || board[index].flagged) return;
    const current = status === 'ready' ? placeMines(board, index) : board;
    const next = reveal(current, index);
    if (next[index].mine) {
      next.forEach(cell => { if (cell.mine) cell.revealed = true; });
      setStatus('lost');
    } else {
      setStatus(next.every(cell => cell.mine || cell.revealed) ? 'won' : 'playing');
    }
    setBoard(next);
  }

  const message = {
    ready: 'Click any square to start.',
    playing: 'Clear the board. Avoid the mines!',
    won: 'You win! All safe squares cleared.',
    lost: 'Boom! Try again.',
  }[status];

  return (
    <main>
      <h1>Minesweeper</h1>
      <p className="subtitle">A little logic. A little luck.</p>
      <div className="toolbar">
        <span>{MINES - flags} flags left</span>
        <button onClick={restart}>New game</button>
      </div>
      <p className={`status ${status}`} role="status">{message}</p>
      <div className="board" aria-label="Minesweeper board">
        {board.map((cell, index) => (
          <button
            key={index}
            className={`cell ${cell.revealed ? 'revealed' : ''} ${cell.revealed && cell.mine ? 'mine' : ''}`}
            data-count={cell.count}
            aria-label={`Row ${Math.floor(index / SIZE) + 1}, column ${index % SIZE + 1}: ${cell.revealed ? (cell.mine ? 'mine' : `${cell.count} nearby mines`) : cell.flagged ? 'flagged' : 'hidden'}`}
            disabled={finished || cell.revealed}
            onClick={() => flagMode ? toggleFlag(index) : openCell(index)}
            onContextMenu={event => { event.preventDefault(); toggleFlag(index); }}
          >
            {cell.revealed ? (cell.mine ? '✹' : cell.count || '') : cell.flagged ? '⚑' : ''}
          </button>
        ))}
      </div>
      <button className={`flag-toggle ${flagMode ? 'active' : ''}`} aria-pressed={flagMode} onClick={() => setFlagMode(!flagMode)}>
        ⚑ Flag mode: {flagMode ? 'On' : 'Off'}
      </button>
      <p className="help">Click to reveal. Right-click to flag.<br />On touch screens, turn on flag mode to place flags.<br />Numbers show how many mines touch a square.</p>
    </main>
  );
}

createRoot(document.getElementById('root')).render(<App />);
