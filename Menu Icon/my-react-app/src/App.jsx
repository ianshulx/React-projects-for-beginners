import "./index.css";
import { useState } from "react";

function App() {
  const [active, setActive] = useState(false);

  const handleClick = () => {
    setActive(true);
  };

  return (
    <section>
      <div
        className={`content ${active ? "active" : ""}`}
        onClick={handleClick}
      >
        <div className={`bar ${active ? "" : "animation_off"}`}></div>
        <div className={`bar ${active ? "" : "animation_off"}`}></div>
        <div className={`bar ${active ? "" : "animation_off"}`}></div>
      </div>
    </section>
  );
}

export default App;



