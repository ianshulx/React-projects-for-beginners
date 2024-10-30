import React from "react";

interface squareProps {
  onfunctionClick: Function;
  value: Number;
  row: number;
  col: number;
  gamerunning: boolean;
}

const Square: React.FC<squareProps> = (props) => {
  function Click() {
    if (props.value == 0 && props.gamerunning == true) {
      props.onfunctionClick(props.row, props.col);
    }
  }

  return (
    <button
      title="t1"
      onClick={() => {
        Click();
      }}
      className="text-center w-28 h-28 border-8 border-black box-border p-3"
    >
      {props.value == 1 ? (
        <svg viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 14.545 1.455 16 8 9.455 14.545 16 16 14.545 9.455 8 16 1.455 14.545 0 8 6.545 1.455 0 0 1.455 6.545 8z"
            fill-rule="evenodd"
            className="cross"
          />
        </svg>
      ) : null}
      {props.value == 2 ? (
        <svg viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
          <circle cx="24" cy="24" r="21.5" className="circle" />
        </svg>
      ) : null}
    </button>
  );
};
export default Square;
