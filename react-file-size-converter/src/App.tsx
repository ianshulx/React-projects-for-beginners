import React, { useState } from "react";
import { FileText, ArrowRight } from "lucide-react";

const units = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

function App() {
  const [inputSize, setInputSize] = useState("");
  const [inputUnit, setInputUnit] = useState("B");
  const [outputUnit, setOutputUnit] = useState("B");
  const [convertedSize, setConvertedSize] = useState("");
  const [error, setError] = useState("");

  const convertSize = (size: number, fromUnit: string, toUnit: string) => {
    const fromIndex = units.indexOf(fromUnit);
    const toIndex = units.indexOf(toUnit);
    const factor = Math.pow(1024, fromIndex - toIndex);
    return (size * factor).toFixed(2);
  };

  const handleConvert = () => {
    const size = parseFloat(inputSize);
    if (isNaN(size) || size < 0) {
      setError("Please enter a valid positive number");
      setConvertedSize("");
    } else {
      setError("");
      const result = convertSize(size, inputUnit, outputUnit);
      setConvertedSize(`${result} ${outputUnit}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          File Size Converter
        </h1>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="fileSize"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Enter file size
            </label>
            <input
              type="number"
              id="fileSize"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={inputSize}
              onChange={(e) => setInputSize(e.target.value)}
              placeholder="e.g., 1048576"
            />
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <label
                htmlFor="inputUnit"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                from:
              </label>
              <select
                id="inputUnit"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={inputUnit}
                onChange={(e) => setInputUnit(e.target.value)}
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex-1">
              <label
                htmlFor="outputUnit"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                to:
              </label>
              <select
                id="outputUnit"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={outputUnit}
                onChange={(e) => setOutputUnit(e.target.value)}
              >
                {units.map((unit) => (
                  <option key={unit} value={unit}>
                    {unit}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            onClick={handleConvert}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
          >
            <FileText className="mr-2" size={18} />
            Convert
          </button>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          {convertedSize && (
            <div className="mt-4 p-4 bg-gray-100 rounded-md">
              <p className="text-lg font-semibold text-center">
                <span className="text-gray-600">
                  {inputSize} {inputUnit}
                </span>
                <ArrowRight className="inline mx-2" size={18} />
                <span className="text-green-600">{convertedSize}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
