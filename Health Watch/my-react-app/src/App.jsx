import "./index.css";
import { useState } from "react";

function App() {
  return (
    <div className="frame">
      <div className="base_c">
        <div className="contents">
          <div className="date">wed 22 jan 1997</div>
          <div className="time">01:22</div>

          <div className="heart">
            <span className="fa-solid fa-heart fa-beat"></span>
            <span>80</span>
            <span className="energy inline">1200 kcal</span>
          </div>
        </div>
      </div>

      <svg className="red_c">
        <circle cx="92" cy="92" r="90" />
      </svg>

      <svg className="dotted_c">
        <circle cx="82" cy="82" r="80" />
      </svg>
    </div>
  );
}

export default App;





