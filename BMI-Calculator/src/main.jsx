import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { TolgeeProvider, Tolgee, DevTools } from "@tolgee/react";
import { FormatIcu } from "@tolgee/format-icu"; // 🟢 to‘g‘ri joy

const tolgee = Tolgee()
  .use(DevTools())
  .use(FormatIcu())
  .init({
    language: "en",
    fallbackLanguage: "en",
    staticData: {
      en: {
        "bmi-calculator-title": "BMI Calculator",
        "bmi-calculator-height-label": "Height (m)",
        "bmi-calculator-weight-label": "Weight (kg)",
        "bmi-calculator-calculate-button": "Calculate",
        "bmi-calculator-your-bmi": "Your BMI: {bmi}",
        "bmi-calculator-underweight": "You are underweight",
        "bmi-calculator-normal-weight": "You have a normal weight",
        "bmi-calculator-overweight": "You are overweight",
        "bmi-calculator-obese": "You are obese",
        "bmi-calculator-invalid-input": "Please enter valid height and weight",
        "bmi-calculator-reset-button": "Reset",
        "bmi-calculator-height-placeholder": "Enter height (m)",
        "bmi-calculator-weight-placeholder": "Enter weight (kg)",
      },
    },
  });

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <TolgeeProvider tolgee={tolgee}>
      <App />
    </TolgeeProvider>
  </React.StrictMode>
);
