// src/components/TezosInteraction.js
import React, { useState, useEffect } from 'react';
import { connectTezosWallet, getTezosAccount, getTezosBalance } from '../services/tezosService';

const TezosInteraction = () => {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');

  useEffect(() => {
    const loadAccountData = async () => {
      try {
        const acc = await getTezosAccount();
        const bal = await getTezosBalance();
        setAccount(acc);
        setBalance(bal);
      } catch (error) {
        console.error('Error fetching Tezos account data:', error);
      }
    };

    // Load account data if wallet is already connected
    loadAccountData();
  }, []);

  const handleConnectWallet = async () => {
    try {
      await connectTezosWallet();
      const acc = await getTezosAccount();
      const bal = await getTezosBalance();
      setAccount(acc);
      setBalance(bal);
    } catch (error) {
      console.error('Error connecting to Tezos wallet:', error);
    }
  };

  return (
    <div>
      <h2>Tezos Interaction</h2>
      {account ? (
        <div>
          <p>Connected Account: {account}</p>
          <p>Balance: {balance} XTZ</p>
        </div>
      ) : (
        <button onClick={handleConnectWallet}>Connect Tezos Wallet</button>
      )}
    </div>
  );
};

export default TezosInteraction;
