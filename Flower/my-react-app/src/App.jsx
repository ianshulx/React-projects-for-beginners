import "./index.css";
import React from "react";

function App() {
  const petals = Array.from({ length: 16 }); // 0 to 15 petals

  return (
    <div className="frame">
      <div className="flower">
        {petals.map((_, index) => (
          <div key={index} className={`petal petal-${index}`}></div>
        ))}
        <div className="dot"></div>
      </div>
    </div>
  );
}

export default App;


