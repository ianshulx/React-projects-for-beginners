import React from "react";

function Die(props){
    const styles = {
        backgroundColor: props.isHeld ? "#FEAC5E" : "#bceeff"
    }
    return(
        <>
        <div onClick={props.holdDice}
            className="die-face" style={styles}>
            <h2>{props.value}</h2>
        </div>
        </>
    )
}

export default Die;