import './App.css';
import { useState } from 'react';

function Board() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [num, setNum] = useState(0)
  const [isWon, setIsWon] = useState(false)
  const [squares, setSquares] = useState(Array(9).fill(null))

  // let squares = history[history.length - 1]

  const win = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  
  
  function SquareUpdate(i) {
    let state
    let nextTurn
    
    if(!squares[i] && !isWon) {
      state = (num % 2 === 0) ? 'X' : 'O'
      setNum(num + 1)
      nextTurn = [...squares]
      nextTurn[i] = state

      const historyCopy = [...history, nextTurn]

      history.push(nextTurn)
      squares.splice(0, squares.length, ...nextTurn)

      // console.log(historyCopy)
      // console.log(history)
      // console.log(squares)
      for(let a=0; a<win.length; a++) {
        let eleSearch = squares[win[a][0]]
  
        for(let b=0; b<3; b++) {  
          if((eleSearch !== squares[win[a][b]]) || (eleSearch == null)) {
            break
          }
          if(b === 2) {
            setIsWon(true)
          }
        }
      }
    }

    // if(!isWon) {
    // }
  }

  function resetFunc() {
    setNum(0)
    setSquares(Array(9).fill(null))
    setHistory([Array(9).fill(null)])
    setIsWon(false)
  }

  function turn() {
    let string = (num % 2 === 0) ? "X turn" : 'O turn'

    if(isWon) {
      string = `${(num%2 === 0) ? "O" : "X"} won`
    }

    return string
  }

  function handleClick(i) {
    setSquares(history[i])
    setNum(i)
    // console.log(squares)
    // console.log(i)
    // console.log(history)
    setIsWon(false)
  }

  return (
    <>
      <div className='board'>
        <div className='row'>
          <Square value={squares[0]} onClick = {() => {SquareUpdate(0)}} />
          <Square value={squares[1]} onClick = {() => {SquareUpdate(1)}} />
          <Square value={squares[2]} onClick = {() => {SquareUpdate(2)}} />
        </div>
        <div className='row'>
          <Square value={squares[3]} onClick = {() => {SquareUpdate(3)}} />
          <Square value={squares[4]} onClick = {() => {SquareUpdate(4)}} />
          <Square value={squares[5]} onClick = {() => {SquareUpdate(5)}} />
        </div>
        <div className='row'>
          <Square value={squares[6]} onClick = {() => {SquareUpdate(6)}} />
          <Square value={squares[7]} onClick = {() => {SquareUpdate(7)}} />
          <Square value={squares[8]} onClick = {() => {SquareUpdate(8)}} />
        </div>
      </div>
      <div className="logs">
        <Turn string={turn} />
        <Reset onClick={resetFunc} />
        {history.map((e, i) => {
          // console.log(i)
          return <History className="history" count={i} key={i} onClick={() => {handleClick(i)}} />
        })}
      </div>
    </>
  );
}

function History({count, onClick}) {
  return (
    <li onClick={onClick}>Go back in time... to step {count}</li>
  )
}

function Turn({string}) {
  return (
    <div className="turn">{string()}</div>
  )
}

function Reset({onClick}) {
  return (
    <div className="reset" onClick={onClick}>Reset</div>
  )
}

function Square({value, onClick}) {

  return (
    <div className="square" onClick={onClick}>{value}</div>
  )
}

export default Board;