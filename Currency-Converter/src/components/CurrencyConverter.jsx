import React, { useState, useEffect } from 'react';

const CurrencyConverter = () => {
    const [amount, setAmount] = useState(1);
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('EUR');
    const [exchangeRate, setExchangeRate] = useState(1);
    const [currencies, setCurrencies] = useState([]);

    // Fetch all currencies and set initial exchange rate on component mount
    useEffect(() => {
        const fetchCurrencies = async () => {
            try {
                const response = await fetch(`https://api.exchangerate-api.com/v4/latest/USD`);
                const data = await response.json();
                setCurrencies(Object.keys(data.rates)); // Set currencies as an array of keys (currency codes)
            } catch (error) {
                console.error("Error fetching currencies:", error);
            }
        };
        fetchCurrencies();
    }, []);

    // Fetch exchange rate whenever `fromCurrency` or `toCurrency` changes
    useEffect(() => {
        const fetchExchangeRate = async () => {
            if (fromCurrency === toCurrency) {
                setExchangeRate(1);
                return;
            }
            try {
                const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
                const data = await response.json();
                setExchangeRate(data.rates[toCurrency]);
            } catch (error) {
                console.error("Error fetching exchange rate:", error);
                setExchangeRate(null);
            }
        };
        fetchExchangeRate();
    }, [fromCurrency, toCurrency]);

    // Handle amount change
    const handleAmountChange = (e) => setAmount(e.target.value);

    // Calculate converted amount
    const calculateConversion = () => (exchangeRate ? (amount * exchangeRate).toFixed(2) : "Error");

    return (
        <div className="max-w-md w-full bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Currency Converter</h1>
            
            <div className="flex flex-col mb-4">
                <label className="text-sm font-medium text-gray-600">Amount</label>
                <input
                    type="number"
                    value={amount}
                    onChange={handleAmountChange}
                    className="mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label className="text-sm font-medium text-gray-600">From</label>
                    <select
                        value={fromCurrency}
                        onChange={(e) => setFromCurrency(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-600">To</label>
                    <select
                        value={toCurrency}
                        onChange={(e) => setToCurrency(e.target.value)}
                        className="mt-1 p-2 w-full border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    >
                        {currencies.map((currency) => (
                            <option key={currency} value={currency}>
                                {currency}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <p className="text-lg font-medium text-gray-700">Converted Amount:</p>
                <p className="text-2xl font-bold text-gray-900">{calculateConversion()} {toCurrency}</p>
            </div>
        </div>
    );
};

export default CurrencyConverter;
