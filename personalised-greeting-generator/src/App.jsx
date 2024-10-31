import React, { useState } from 'react';

const GreetingApp = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [showGreeting, setShowGreeting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowGreeting(true);
  };

  const resetForm = () => {
    setName('');
    setAge('');
    setLocation('');
    setShowGreeting(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Personalized Greeting App</h1>
      
      {!showGreeting ? (
        <form 
          onSubmit={handleSubmit} 
          className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full"
        >
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Name</label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Age</label>
            <input 
              type="number" 
              value={age} 
              onChange={(e) => setAge(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your age"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">Location</label>
            <input 
              type="text" 
              value={location} 
              onChange={(e) => setLocation(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
              placeholder="Enter your location"
              required
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg shadow hover:bg-blue-600 transition duration-200"
          >
            Show Greeting
          </button>
        </form>
      ) : (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-md w-full text-center">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">
            Hello, {name}!
          </h2>
          <p className="text-gray-600">
            It's wonderful to meet a {age}-year-old from {location}. Have a fantastic day!
          </p>
          <button 
            onClick={resetForm} 
            className="mt-6 bg-red-500 text-white py-2 px-4 rounded-lg shadow hover:bg-red-600 transition duration-200"
          >
            Reset
          </button>
        </div>
      )}
    </div>
  );
};

export default GreetingApp;
