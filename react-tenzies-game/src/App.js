import './App.css';
import Die from './components/Die';
import React from 'react';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti'

function App() {

  const [dice, setDice] = React.useState(allNewDiceNum());
  const [tenzies, setTenzies] = React.useState(false)
  const [totalRolls, setTotalRolls] = React.useState(0);


  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld) //all dice are on hold
    const firstValue = dice[0].value  //value of the first die
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue){
      setTenzies(true)
      setRunning(false);
      console.log("You won")
    }
  },[dice])
  
  //generating random value for die
  function generateNewDie(){
    return {
      value : Math.ceil(Math.random()*6),  //Math.ceil starts num count from 1.
      isHeld: false,
      id: nanoid()
    }
  }
  
  //changing values of all dice
  function allNewDiceNum(){
    const newDiceNum = [];
    for(let i=0 ; i<10 ; i++){
      newDiceNum.push(generateNewDie()) 
    }
    return newDiceNum;
  }
  
  //rolling dice which are not held
  function rollDice(){
    if(!tenzies){
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : generateNewDie()
      }))
      setTotalRolls(totalRolls + 1);
    }
    else{
      setTenzies(false)
      setDice(allNewDiceNum())
      setTotalRolls(0);
      setTime(0);
    }
  }

  //holding dice
  function holdDice(id) {
    setDice((oldArr) =>
        oldArr.map((die) => {
            if (id === die.id) {
                // Start Timer
                setRunning(true);
                return { ...die, isHeld: !die.isHeld };
            } else {
                return die;
            }
        })
    );
}

  //DICE
  const diceElements = dice.map(die => 
  <Die 
    key={die.id} 
    value={die.value} 
    isHeld={die.isHeld}
    holdDice={() => holdDice(die.id)}/> )

  // console.log(allNewDiceNum())

  const [time, setTime] = React.useState(0);
  const [running, setRunning] = React.useState(false);

  React.useEffect(() => {
      let interval = null;
      if (running) {
          interval = setInterval(() => {
              setTime((prevTime) => prevTime + 10);
          }, 10);
      } else {
          clearInterval(interval);
      }
      return () => clearInterval(interval);
  }, [running]);


  return (
    <>
    <main>
      {tenzies && <Confetti/>}
      <h1>Tenzies</h1>
      <p className='rules'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className='dice-container'>
        {diceElements}
      </div>
      <div className="results">
                <p className="total-rolls">Total Rolls: {totalRolls}</p>
                <div className="results-time">
                    <p>Time:</p>
                    <div>
                        <span>
                            {("0" + Math.floor((time / 60000) % 60)).slice(-2)}:
                        </span>
                        <span>
                            {("0" + Math.floor((time / 1000) % 60)).slice(-2)}:
                        </span>
                        <span>{("0" + ((time / 10) % 100)).slice(-2)}</span>
                    </div>
                </div>
            </div>
      <button className='roll-btn' 
      onClick={rollDice}
      >
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
    </>
  );
}

export default App;
