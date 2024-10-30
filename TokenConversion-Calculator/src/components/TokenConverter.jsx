// src/components/TokenConverter.jsx
import React, { useState, useEffect } from 'react';

const TokenConverter = () => {
  const [tokens, setTokens] = useState(["bitcoin", "ethereum", "dogecoin", "cardano", "litecoin"]);
  const [conversionRates, setConversionRates] = useState({});
  const [fromToken, setFromToken] = useState("bitcoin");
  const [toToken, setToToken] = useState("ethereum");
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConversionRates = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${tokens.join(
            ","
          )}&vs_currencies=usd`
        );
        const data = await response.json();
        setConversionRates(data);
      } catch (error) {
        setError("Could not fetch conversion rates. Try again later.");
      }
    };
    fetchConversionRates();
  }, [tokens]);

  const handleConvert = () => {
    if (fromToken && toToken && amount && conversionRates[fromToken] && conversionRates[toToken]) {
      const fromRate = conversionRates[fromToken].usd;
      const toRate = conversionRates[toToken].usd;
      const result = (amount * fromRate) / toRate;
      setConvertedAmount(result.toFixed(4));
    } else {
      setConvertedAmount(null);
      setError("Please fill in all fields.");
    }
  };

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Token Conversion Calculator</h1>

      {error && <div className="text-red-500 mb-4">{error}</div>}

      <div className="space-y-4">
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex space-x-4">
          <select
            value={fromToken}
            onChange={(e) => setFromToken(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {tokens.map((token) => (
              <option key={token} value={token}>
                {token.charAt(0).toUpperCase() + token.slice(1)}
              </option>
            ))}
          </select>

          <select
            value={toToken}
            onChange={(e) => setToToken(e.target.value)}
            className="w-1/2 p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {tokens.map((token) => (
              <option key={token} value={token}>
                {token.charAt(0).toUpperCase() + token.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={handleConvert}
          className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Convert
        </button>

        {convertedAmount && (
          <div className="mt-4 text-lg font-medium text-gray-700">
            Converted Amount: {convertedAmount} {toToken.charAt(0).toUpperCase() + toToken.slice(1)}
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenConverter;
