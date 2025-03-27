// src/App.jsx
import BMICalculator from './components/BMICalculator';
import BMICalculators from './components/BMICalculators';

function App() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-100">
      <BMICalculators />
      {/* <BMICalculator /> */}
    </div>
  );
}

export default App;
