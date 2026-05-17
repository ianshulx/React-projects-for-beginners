import { useState } from "react";
import validator from "validator";

const App = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [flag, setFlag] = useState(false);
  const [credit, setCredit] = useState("");

  const validateCreditCard = (value) => {
    if (validator.isCreditCard(value)) {
      setErrorMessage(" Valid Credit Card Number");
      setFlag(true);
    } 
    else if(value===''){
      setErrorMessage("");
    }
    else {
      setErrorMessage(" Enter a valid Credit Card Number!");
      setFlag(false);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        fontFamily: "Arial, sans-serif",
        padding: "40px",
        backgroundColor: "#f9f9f9",
        height: "100vh",
      }}
    >
      <div
        style={{
          background: "#101b30",
          padding: "30px 40px",
          borderRadius: "10px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          maxWidth: "400px",
          width: "100%",
        }}
      >
        <h2 style={{ color: "#fff", marginBottom: "20px" }}>
          Credit Card Validator
        </h2>

        <label style={{ marginBottom: "10px", display: "block", color: "#aaa" }}>
          Enter Credit Card Number:
        </label>

        <input
          type="password"
          value={credit}
          onChange={(e) => {
            const newValue = e.target.value;
            setCredit(newValue);
            validateCreditCard(newValue);
          }}
          placeholder="•••• •••• •••• ••••"
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "6px",
            outline: "none",
            marginBottom: "15px",
          }}
        />

        <div
          style={{
            fontWeight: "600",
            color: flag ? "#44ed23" : "red",
            minHeight: "24px",
          }}
        >
          {errorMessage}
        </div>
      </div>
    </div>
  );
};

export default App;
