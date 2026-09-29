# minesweeper

A simple React Minesweeper game with a 9×9 board and 10 mines.

## Run

Requires Node.js 20.19+ or 22.12+.

```sh
npm install
npm start
```

Open the local URL printed in your terminal.

## Play

- Click a square to reveal it. Your first click and its neighbors are safe.
- Numbers count mines in the eight surrounding squares.
- Right-click to add or remove a flag. On mobile, use the flag mode button.
- Reveal every safe square to win. Hitting a mine ends the game.
- Click **New game** to restart.

Run `npm test` to check the game logic or `npm run build` to create a production build.
