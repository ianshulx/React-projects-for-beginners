import React, { useState } from "react";
import "./App.css";

const App = () => {
  const [value, setValue] = useState({
    radiusOne: 30,
    radiusTwo: 80,
    radiusThree: 60,
    radiusFour: 40,
    blobHeight: 200,
    blobWidth: 200,
  });
  const [valueColor, setValueColor] = useState({
    colorOne: "#B6FFFA",
    colorTwo: "#80B3FF",
  });
  const [borderRadius, setBorderRadius] = useState(0);
  const [outputCode, setOutputCode] = useState("");

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: parseInt(e.target.value) });
    setValueColor({ ...valueColor, [e.target.name]: e.target.value });

    let updatedBorderRadius = `${value.radiusOne}% ${100 - value.radiusOne}% ${
      100 - value.radiusThree
    }% ${value.radiusThree}% / ${value.radiusFour}% ${value.radiusTwo}% ${
      100 - value.radiusTwo
    }% ${100 - value.radiusFour}%`;
    setBorderRadius(updatedBorderRadius);
    setOutputCode(
      `border-radius: ${updatedBorderRadius}, background: ${`linear-gradient(to bottom,  ${valueColor.colorOne} 0%,${valueColor.colorTwo} 100%)`}`
    );
  };

  return (
    <>
      <h1 className="title">Blob Generator</h1>
      <div className="wrapper">
        <div className="output">
          <div
            id="blob"
            style={{
              borderRadius: `${borderRadius}`,
              height: `${value.blobHeight}px`,
              width: `${value.blobWidth}px`,
              background: `linear-gradient(to bottom,  ${valueColor.colorOne} 0%,${valueColor.colorTwo} 100%)`,
            }}
          ></div>
        </div>
        <div className="dimensions">
          <div>
            <label htmlFor="blog-height"> Height </label>
            <input
              type="number"
              id="blob-height"
              name="blobHeight"
              value={value.blobHeight}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="blog-width"> Width </label>
            <input
              type="number"
              id="blob-width"
              name="blobWidth"
              value={value.blobWidth}
              onChange={handleChange}
            />
          </div>
          <div>
            <label htmlFor="blog-width"> Select Colors </label>
            <input
              type="color"
              name="colorOne"
              value={valueColor.colorOne}
              onChange={handleChange}
            />
            <span>/</span>
            <input
              type="color"
              name="colorTwo"
              value={valueColor.colorTwo}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="sliders">
          <input
            type="range"
            name="radiusOne"
            value={value.radiusOne}
            onChange={handleChange}
          />
          <input
            type="range"
            name="radiusTwo"
            value={value.radiusTwo}
            onChange={handleChange}
          />
          <input
            type="range"
            name="radiusThree"
            value={value.radiusThree}
            onChange={handleChange}
          />
          <input
            type="range"
            name="radiusFour"
            value={value.radiusFour}
            onChange={handleChange}
          />
        </div>
        <div className="footer">
          <p>{outputCode}</p>
          <button
            id="copy"
            onClick={() => {
              navigator.clipboard.writeText(outputCode);
            }}
          >
            Copy
          </button>
        </div>
      </div>
    </>
  );
};

export default App;
