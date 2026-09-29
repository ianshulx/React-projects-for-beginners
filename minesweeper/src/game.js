export const SIZE = 9;
export const MINES = 10;

export function emptyBoard() {
  return Array.from({ length: SIZE * SIZE }, () => ({
    mine: false, revealed: false, flagged: false, count: 0,
  }));
}

export function neighbors(index) {
  const row = Math.floor(index / SIZE);
  const col = index % SIZE;
  const result = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      const r = row + dr;
      const c = col + dc;
      if ((dr || dc) && r >= 0 && r < SIZE && c >= 0 && c < SIZE) {
        result.push(r * SIZE + c);
      }
    }
  }
  return result;
}

// Place mines after the first click so its surrounding area is always safe.
export function placeMines(board, firstClick) {
  const next = board.map(cell => ({ ...cell }));
  const safe = new Set([firstClick, ...neighbors(firstClick)]);
  const candidates = next.map((_, i) => i).filter(i => !safe.has(i));
  for (let i = candidates.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [candidates[i], candidates[j]] = [candidates[j], candidates[i]];
  }
  candidates.slice(0, MINES).forEach(i => { next[i].mine = true; });
  next.forEach((cell, i) => {
    cell.count = neighbors(i).filter(n => next[n].mine).length;
  });
  return next;
}

export function reveal(board, index) {
  const next = board.map(cell => ({ ...cell }));
  const pending = [index];
  while (pending.length) {
    const i = pending.pop();
    const cell = next[i];
    if (cell.revealed || cell.flagged) continue;
    cell.revealed = true;
    if (!cell.mine && cell.count === 0) pending.push(...neighbors(i));
  }
  return next;
}
