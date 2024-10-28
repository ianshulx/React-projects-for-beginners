// src/components/GetBalance.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GetBalance = () => {
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    // Make the API call to the backend
    axios.get('http://localhost:3000/api/balance')
      .then(response => {
        // Set the state with the balance data from the backend
        setBalance(response.data.amount);
      })
      .catch(error => {
        console.error("There was an error fetching the balance!", error);
      });
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <div>
      <h2>Account Balance</h2>
      {balance ? <p>Your balance is: {balance}</p> : <p>Loading...</p>}
    </div>
  );
};

export default GetBalance;
