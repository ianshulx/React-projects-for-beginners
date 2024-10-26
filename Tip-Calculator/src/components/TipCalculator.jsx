import React, { useState } from 'react';

const TipCalculator = () => {
    const [billAmount, setBillAmount] = useState('');
    const [tipPercentage, setTipPercentage] = useState(15);
    const [numPeople, setNumPeople] = useState(1);
    const [totalTip, setTotalTip] = useState(0);
    const [totalPerPerson, setTotalPerPerson] = useState(0);

    const calculateTip = () => {
        const tip = (billAmount * tipPercentage) / 100;
        const total = parseFloat(billAmount) + tip;
        const perPerson = total / numPeople;

        setTotalTip(tip);
        setTotalPerPerson(perPerson);
    };

    const handleBillChange = (e) => setBillAmount(e.target.value);
    const handleTipChange = (e) => setTipPercentage(e.target.value);
    const handleNumPeopleChange = (e) => setNumPeople(e.target.value);

    return (
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Bill Amount:</label>
                <input
                    type="number"
                    value={billAmount}
                    onChange={handleBillChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter bill amount"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Tip Percentage:</label>
                <input
                    type="number"
                    value={tipPercentage}
                    onChange={handleTipChange}
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Tip %"
                />
            </div>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Number of People:</label>
                <input
                    type="number"
                    value={numPeople}
                    onChange={handleNumPeopleChange}
                    min="1"
                    className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter number of people"
                />
            </div>
            <button
                onClick={calculateTip}
                className="w-full py-2 px-4 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition duration-200"
            >
                Calculate
            </button>

            {totalTip > 0 && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg text-gray-800">
                    <h2 className="text-lg font-semibold">Results:</h2>
                    <p className="mt-2">Total Tip: <span className="font-semibold">${totalTip.toFixed(2)}</span></p>
                    <p>Total Amount: <span className="font-semibold">${(parseFloat(billAmount) + totalTip).toFixed(2)}</span></p>
                    <p>Amount per Person: <span className="font-semibold">${totalPerPerson.toFixed(2)}</span></p>
                </div>
            )}
        </div>
    );
};

export default TipCalculator;
