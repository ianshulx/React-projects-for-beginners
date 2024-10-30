import React from "react";

function Alert(props) {
  const captilize = (word) => {
    let lower = word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1)
  }
  return (
    <div style={{height:"50px"}}>
    {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert" style={{textAlign : "center"}} >
    <strong>{captilize(props.alert.type)}</strong> : {props.alert.message}
        <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>}
    </div>
  );
}

export default Alert;
