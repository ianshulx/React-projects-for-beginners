import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Sidebar.css";
import { Slider } from "@mui/material";

const Sidebar = () => {
  const myState = useSelector((state) => state.updateProps);
  const dispatch = useDispatch();

  const [max, setMax] = useState(30);

  const handleAlgo = (algo) => {
    dispatch({
      type: "UPDATE_ALGORITHM",
      algorithm: algo,
    });
  };

  const resetColor = () => {
    dispatch({
      type: "UPDATE_COLOR",
      color: document.getElementById("color").value,
    });
  };

  const handleRange = (_range) => {
    let new_arr = [...myState.values];
    for (let i = 0; i < new_arr.length; i++)
      document.getElementById(i).style.transform = `translateX(${i * 11}px)`;

    resetColor();

    dispatch({
      type: "UPDATE_RANGE",
      range: _range,
    });
    dispatch({
      type: "CHANGE_VALUES",
    });
  };

  const handleColor = (_color) => {
    dispatch({
      type: "UPDATE_COLOR",
      color: _color,
    });
  };

  const handleSpeed = (_speed) => {
    dispatch({
      type: "UPDATE_SPEED",
      speed: _speed,
    });
  };

  useEffect(() => {
    handleRange(30);
  }, []);

  useEffect(() => {
    dispatch({
      type: "UPDATE_COLOR",
      color: document.getElementById("color").value,
    });
  }, [myState.values]);

  const handleWidth = () => {
    if (window.innerWidth > 1300) setMax(70);
    else if (window.innerWidth > 1200) setMax(60);
    else if (window.innerWidth > 1100) setMax(50);
    else if (window.innerWidth > 900) setMax(45);
    else if (window.innerWidth > 800) setMax(40);
    else if (window.innerWidth > 500) setMax(30);
    else setMax(20);
  };

  useEffect(() => {
    handleWidth();
    window.addEventListener("resize", handleWidth);
    return () => window.removeEventListener("resize", handleWidth);
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__option">
        <label htmlFor="algo">Algorithm: </label>
        <select
          name="algo"
          id="algo"
          onChange={(e) => handleAlgo(e.target.value)}
          disabled={myState.play ? true : false}
        >
          <option value="bubble">Bubble Sort </option>
          <option value="merge">Merge Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="quick">Quick Sort</option>
        </select>
      </div>

      <div className="sidebar__option">
        <label htmlFor="range">Range: </label>
        <Slider
          style={{ width: "180px" }}
          size="small"
          defaultValue={30}
          id="slider"
          min={1}
          className="slider"
          disabled={myState.play ? true : false}
          max={max}
          onChange={(e) => handleRange(e.target.value)}
          valueLabelDisplay="auto"
        />
      </div>

      <div className="sidebar__option">
        <label htmlFor="color">Color: </label>
        <select
          name="color"
          id="color"
          onChange={(e) => handleColor(e.target.value)}
          disabled={myState.play ? true : false}
        >
          <option
            value="rgb(0, 149, 199)"
            style={{ color: "rgb(0, 149, 199)" }}
          >
            Blue
          </option>
          <option value="rgb(85, 212, 0)" style={{ color: "rgb(10,200,20)" }}>
            Green
          </option>
          <option value="rgb(255, 112, 112)" style={{ color: "red" }}>
            Red
          </option>
          <option value="grey" style={{ color: "grey" }}>
            Black
          </option>
          <option value="#ddd902" style={{ color: "#ddd902" }}>
            Yellow
          </option>
        </select>
      </div>

      <div className="sidebar__option">
        <label htmlFor="speed">Speed: </label>
        <select
          name="speed"
          defaultValue={100}
          id="speed"
          onChange={(e) => handleSpeed(e.target.value)}
          disabled={myState.play ? true : false}
        >
          <option value={500}>Slow</option>
          <option value={200}>Medium</option>
          <option value={100}>Fast</option>
          <option value={20}>Super Fast</option>
          <option value={5}>Ultra Fast</option>
        </select>
      </div>
    </div>
  );
};

export default Sidebar;
