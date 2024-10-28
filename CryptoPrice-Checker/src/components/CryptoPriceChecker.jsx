// src/components/CryptoPriceChecker.jsx
import React, { useState, useEffect } from 'react';

const CryptoPriceChecker = () => {
  const [prices, setPrices] = useState({});
  const [error, setError] = useState(null);

  const cryptoSymbols = ["bitcoin", "ethereum", "dogecoin", "cardano", "litecoin"];

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoSymbols.join(
            ","
          )}&vs_currencies=usd`
        );
        const data = await response.json();
        setPrices(data);
      } catch (error) {
        setError("Could not fetch prices. Try again later.");
      }
    };

    fetchPrices();
  }, []);

  return (
    <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold mb-4 text-gray-800">Crypto Price Checker</h1>

      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="space-y-4">
          {cryptoSymbols.map((crypto) => (
            <div
              key={crypto}
              className="flex justify-between items-center p-4 bg-gray-100 rounded"
            >
              <span className="capitalize font-medium text-gray-700">{crypto}</span>
              <span className="font-semibold text-gray-800">
                ${prices[crypto]?.usd ? prices[crypto].usd.toFixed(2) : "Loading..."}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CryptoPriceChecker;
