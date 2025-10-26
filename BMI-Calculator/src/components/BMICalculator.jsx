import { useState } from "react";
import "./BMICalculator.css";

const BMICalculator = () => {
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [bmi, setBMI] = useState(null);
  const [message, setMessage] = useState("");

  const calculateBMI = (e) => {
    e.preventDefault();
    if (height && weight) {
      let heightInMeters = parseFloat(height);

      // cm kiritilsa, avtomatik metrga aylantirish
      if (heightInMeters > 3) {
        heightInMeters = heightInMeters / 100;
      }

      const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);
      setBMI(bmiValue);

      if (bmiValue < 18.5) {
        setMessage("You are underweight.");
      } else if (bmiValue < 24.9) {
        setMessage("You have a normal weight.");
      } else if (bmiValue < 29.9) {
        setMessage("You are overweight.");
      } else {
        setMessage("You are obese.");
      }
    } else {
      setMessage("Please enter valid height and weight!");
    }
  };

  const resetForm = () => {
    setHeight("");
    setWeight("");
    setBMI(null);
    setMessage("");
  };

  return (
    <div className="bmi-container">
      <div className="bmi-card">
        <h1>BMI Calculator</h1>
        <form onSubmit={calculateBMI}>
          <label>Height (m or cm)</label>
          <input
            type="number"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            placeholder="Enter height (e.g., 1.8 or 180)"
            required
          />

          <label>Weight (kg)</label>
          <input
            type="number"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="Enter weight (kg)"
            required
          />

          <div className="btn-group">
            <button type="submit" className="calc-btn">
              Calculate
            </button>
            <button type="button" onClick={resetForm} className="reset-btn">
              Reset
            </button>
          </div>
        </form>

        {bmi && (
          <div className="result">
            <h2>Your BMI: {bmi}</h2>
            <p>{message}</p>
            <small style={{ color: "#bde0fe" }}>
              (If you entered height in cm — we convert automatically to meters)
            </small>
          </div>
        )}
      </div>
    </div>
  );
};

export default BMICalculator;
