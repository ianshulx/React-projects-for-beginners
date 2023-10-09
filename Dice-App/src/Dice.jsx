import './dice.css'
function Dice({diceVal}) {
    
    return (<div className="dice-container">
    <div><div className={`dot-top-left dot${diceVal > 3 && diceVal < 7 ? "-visible" : ""}`}></div></div>
    <div><div className={`dot-top-right dot${diceVal > 1 && diceVal < 7 ? "-visible" : ""}`}></div></div>
    <div><div className={`dot-middle-left dot${diceVal == 6 ? "-visible" : ""}`}></div></div>
    <div><div className={`dot-middle dot${diceVal == 5 || diceVal == 3 || diceVal == 1 ? "-visible" : ""}`}></div></div>
    <div><div className={`dot-middle-right dot${diceVal == 6 ? "-visible" : ""}`}></div></div>
    <div><div className={`dot-bottom-left dot${diceVal > 1 && diceVal < 7 ? "-visible" : ""}`}></div></div>
    <div><div className={`dot-bottom-right dot${diceVal > 3 && diceVal < 7 ? "-visible" : ""}`}></div></div>
    </div>)
}

export default Dice;