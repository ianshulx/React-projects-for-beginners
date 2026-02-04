import "./index.css";
import { useState } from "react";

function App() {
  return (
    <div className="container">
      <div className="moon">
        <div className="crater1"></div>
        <div className="crater2"></div>
        <div className="crater3"></div>
        <div className="crater4"></div>
        <div className="crater5"></div>
        <div className="crater6"></div>
        <div className="crater7"></div>
        <div className="crater8"></div>
        <div className="crater9"></div>
        <div className="crater10"></div>
      </div>

      <div className="hill-bg-1"></div>
      <div className="hill-bg-2"></div>
      <div className="hill-fg-1"></div>
      <div className="hill-fg-2"></div>
      <div className="hill-fg-3"></div>

      <div className="front">
        <div className="temperature">12°</div>

        <div className="info">
          Wind: E 7 km/h
          <br />
          Humidity: 87%
        </div>

        <table className="preview">
          <tbody>
            <tr>
              <td>TUE</td>
              <td>21° / 9°</td>
            </tr>
            <tr>
              <td>WED</td>
              <td>23° / 10°</td>
            </tr>
          </tbody>
        </table>

        <div className="drop-big-1"></div>
        <div className="drop-big-2"></div>
        <div className="drop-big-3"></div>
        <div className="drop-medium-1"></div>
        <div className="drop-medium-2"></div>
        <div className="drop-medium-3"></div>
        <div className="drop-small-1"></div>
        <div className="drop-small-2"></div>
        <div className="drop-small-3"></div>
      </div>
    </div>
  );
}

export default App;




