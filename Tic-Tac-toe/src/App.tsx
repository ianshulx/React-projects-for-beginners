import { useState } from "react";
import Square from "./Square";

import "./App.css";

function App() {

  const [isHuman, setisHuman] = useState(true);

  const [turn, setturn] = useState(1);
  const [winner, setwinner] = useState(0);
  const [moves, setmoves] = useState(0);
  const [color , setcolor] = useState("#dd8e6f");

  var initTable: number[][] = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ];

  const [tableArray, setTableArray] = useState(initTable);
  const [gamerunning, setgamerunning] = useState(true);

  function Reset(){
    initTable = [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ];
    setTableArray(initTable);
    setgamerunning(true);
    setmoves(0);
    setwinner(0);
    setturn(1);
    setcolor("#de8f70");
  }

  function checkArray(arr: number[][]) {
    if (
      (arr[0][0] == 1 && arr[1][1] == 1 && arr[2][2] == 1) ||
      (arr[0][0] == 2 && arr[1][1] == 2 && arr[2][2] == 2)
    ) {
      return false;
      setwinner(turn);
    }

    for (let i = 0; i < 3; i++) {
      if (
        (arr[i][0] == 1 && arr[i][1] == 1 && arr[i][2] == 1) ||
        (arr[i][0] == 2 && arr[i][1] == 2 && arr[i][2] == 2)
      ) {
        return false;
        setwinner(turn);
      } else if (
        (arr[0][i] == 1 && arr[1][i] == 1 && arr[2][i] == 1) ||
        (arr[0][i] == 2 && arr[1][i] == 2 && arr[2][i] == 2)
      ) {
        return false;
        setwinner(turn);
      }
    }
    if (
      (arr[0][2] == 1 && arr[1][1] == 1 && arr[2][0] == 1) ||
      (arr[0][2] == 2 && arr[1][1] == 2 && arr[2][0] == 2)
    ) {
      return false;
      setwinner(turn);
    } else {
      return true;
    }
  }

  function onSquareClick(row: number, col: number) {
    if(isHuman){
      initTable = tableArray;
      initTable[row][col] = turn;
      setTableArray(initTable);

      if (gamerunning) {
        var m = moves + 1;
        setmoves(m);
    
        if(moves % 2 ==0){
          setturn(2);
          setcolor("#3f7cab");
        }
        else{
          setturn(1);
          setcolor("#dd8e6f");
        }
      }
    }
    else if(!isHuman){
      initTable = tableArray;
      initTable[row][col] = turn;
      setTableArray(initTable);

      if(gamerunning){
        var m = moves + 1;
        setmoves(m);
      }
      
    }

    
    setgamerunning(checkArray(tableArray));
    setwinner(turn);

    if (moves == 9) {
      setgamerunning(false);
    }

  
  }

  return (
    <>
      <div className="h-screen w-screen" style={{backgroundColor:color}}>
        <div className="text-center p-5 text-xl">
          <h1>Tic Tac Toe</h1>
        </div>

        {gamerunning == false && moves != 9 ? (
          <h2 className="text-center p-2"> Winner is Player {winner}</h2>
        ) : null}

        {moves == 9 ? <h2 className="text-center p-2"> Draw</h2> : null}

        <h2 className="text-center p-2">Turn: Player {turn}</h2>
        <div className="tableWrapper flex  justify-center  ">
          <div className=" bg-white  flex flex-col justify-center">
            <div className="flex w-auto justify-center">
              <Square
                onfunctionClick={onSquareClick}
                value={tableArray[0][0]}
                row={0}
                col={0}
                gamerunning={gamerunning}
              />
              <Square
                onfunctionClick={onSquareClick}
                value={tableArray[0][1]}
                row={0}
                col={1}
                gamerunning={gamerunning}
              />
              <Square
                onfunctionClick={onSquareClick}
                value={tableArray[0][2]}
                row={0}
                col={2}
                gamerunning={gamerunning}
              />
            </div>
            <div className="flex w-auto justify-center">
              <Square
                onfunctionClick={onSquareClick}
                value={tableArray[1][0]}
                row={1}
                col={0}
                gamerunning={gamerunning}
              />
              <Square
                onfunctionClick={onSquareClick}
                value={tableArray[1][1]}
                row={1}
                col={1}
                gamerunning={gamerunning}
              />
              <Square
                onfunctionClick={onSquareClick}
                value={tableArray[1][2]}
                row={1}
                col={2}
                gamerunning={gamerunning}
              />
            </div>
            <div className="flex w-auto justify-center">
              <Square
                onfunctionClick={onSquareClick}
                value={tableArray[2][0]}
                row={2}
                col={0}
                gamerunning={gamerunning}
              />
              <Square
                onfunctionClick={onSquareClick}
                value={tableArray[2][1]}
                row={2}
                col={1}
                gamerunning={gamerunning}
              />
              <Square
                onfunctionClick={onSquareClick}
                value={tableArray[2][2]}
                row={2}
                col={2}
                gamerunning={gamerunning}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center p-5"><button title="Reset" onClick={()=>{Reset()}} className="flex justify-center">Reset</button></div>
      </div>
    </>
  );
}

export default App;
