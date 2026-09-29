import test from 'node:test';
import assert from 'node:assert/strict';
import { emptyBoard, neighbors, placeMines, reveal, MINES } from './game.js';

test('first click and neighboring squares are safe, with exactly 10 mines', () => {
  for (let first = 0; first < 81; first++) {
    const board = placeMines(emptyBoard(), first);
    assert.equal(board.filter(cell => cell.mine).length, MINES);
    for (const i of [first, ...neighbors(first)]) assert.equal(board[i].mine, false);
    board.forEach((cell, i) => assert.equal(cell.count, neighbors(i).filter(n => board[n].mine).length));
  }
});

test('neighbors respect board edges', () => {
  assert.deepEqual(neighbors(0), [1, 9, 10]);
  assert.equal(neighbors(40).length, 8);
  assert.deepEqual(neighbors(80), [70, 71, 79]);
});

test('empty regions expand without revealing flags or mutating the original', () => {
  const board = emptyBoard();
  board[80].flagged = true;
  const next = reveal(board, 0);
  assert.equal(next.filter(cell => cell.revealed).length, 80);
  assert.equal(next[80].revealed, false);
  assert.equal(board[0].revealed, false);
});

test('revealing a numbered square or mine does not expand', () => {
  const board = placeMines(emptyBoard(), 0);
  const numbered = board.findIndex(cell => !cell.mine && cell.count > 0);
  const mine = board.findIndex(cell => cell.mine);
  assert.equal(reveal(board, numbered).filter(cell => cell.revealed).length, 1);
  assert.equal(reveal(board, mine).filter(cell => cell.revealed).length, 1);
});
