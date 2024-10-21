import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import {
  decrement,
  increment,
  incrementByAmount,
  reset,
} from "./features/counter/counterSlice";
import { useState } from "react";

function App() {
  const [Amount, setAmount] = useState(0);
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };

  const handleReset = () => {
    dispatch(reset());
  };

  const handleSubmit = () => {
    dispatch(incrementByAmount(Amount));
  };

  return (
    <>
      <div className="container">
        <div>
          <h1>Count: {count}</h1>
        </div>

        <div className="container">
          <button onClick={handleIncrement}>+</button>
          <br /> <br />
          <button onClick={handleDecrement}>-</button>
          <br /> <br />
          <button onClick={handleReset}>Reset</button>
          <br /> <br />
          <input id="EA"
            type="number"
            value={Amount}
            placeholder="Enter Amount"
            onChange={(e) => setAmount(e.target.value)}
          />
          <button onClick={handleSubmit}>Inc by Amount</button>
        </div>
      </div>
    </>
  );
}

export default App;
