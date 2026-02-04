import "./index.css";
import { useState } from "react";

function App() {
  return (
    <div className="frame">
      <div className="centered-card">
        <div className="header">
          <div className="header-row">
            <span className="bold">WEEKLY REPORT</span>
            <span>01. Feb - 07.Feb</span>
          </div>
          <div className="header-row align-right">
            <span>Revenue</span>
            <span className="bold">$ 3621.79</span>
          </div>
        </div>

        <div className="graph">
          <div className="lines-container">
            <div className="line"></div>
            <div className="line"></div>
            <div className="line"></div>
          </div>

          <div className="flex text-container">
            <div className="flex chips-detail">
              <span className="text-gray blue">Purchases</span>
              <span className="text-gray red">Views</span>
            </div>
            <div className="days">
              <span className="text-gray">MON</span>
              <span className="text-gray">TUE</span>
              <span className="text-gray">WED</span>
              <span className="text-gray">THU</span>
              <span className="text-gray">FRI</span>
              <span className="text-gray">SAT</span>
              <span className="text-gray">SUN</span>
            </div>
          </div>

          <svg height="100%" width="90%" className="line1">
            <polyline
              points="0,26 41.6,41 83.33,22 125,36 166.66,30 208.33,13 250,20"
              style={{ fill: "none", stroke: "#7BA2FF", strokeWidth: "2px" }}
            />
          </svg>

          <svg height="100%" width="90%" className="line2">
            <polyline
              points="0,40 41.6,81 83.33,60 125,75 166.66,50 208.33,43 250,70"
              style={{ fill: "none", stroke: "#FA7373", strokeWidth: "2px" }}
            />
          </svg>

          <div className="dot dot-red red-1 tooltip">
            <span className="tooltiptext dot-red tip-red">458</span>
          </div>
          <div className="dot dot-red red-2 tooltip">
            <span className="tooltiptext dot-red tip-red">812</span>
          </div>
          <div className="dot dot-red red-3 tooltip">
            <span className="tooltiptext dot-red tip-red">746</span>
          </div>
          <div className="dot dot-red red-4 tooltip">
            <span className="tooltiptext dot-red tip-red">877</span>
          </div>
          <div className="dot dot-red red-5 tooltip">
            <span className="tooltiptext dot-red tip-red">517</span>
          </div>
          <div className="dot dot-red red-6 tooltip">
            <span className="tooltiptext dot-red tip-red">434</span>
          </div>
          <div className="dot dot-red red-7 tooltip">
            <span className="tooltiptext dot-red tip-red">458</span>
          </div>

          <div className="dot dot-blue blue-1 tooltip">
            <span className="tooltiptext dot-blue tip-blue">26</span>
          </div>
          <div className="dot dot-blue blue-2 tooltip">
            <span className="tooltiptext dot-blue tip-blue">41</span>
          </div>
          <div className="dot dot-blue blue-3 tooltip">
            <span className="tooltiptext dot-blue tip-blue">22</span>
          </div>
          <div className="dot dot-blue blue-4 tooltip">
            <span className="tooltiptext dot-blue tip-blue">36</span>
          </div>
          <div className="dot dot-blue blue-5 tooltip">
            <span className="tooltiptext dot-blue tip-blue">25</span>
          </div>
          <div className="dot dot-blue blue-6 tooltip">
            <span className="tooltiptext dot-blue tip-blue">13</span>
          </div>
          <div className="dot dot-blue blue-7 tooltip">
            <span className="tooltiptext dot-blue tip-blue">20</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;




