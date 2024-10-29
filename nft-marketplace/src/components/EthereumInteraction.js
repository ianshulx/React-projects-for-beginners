import React, { useState, useEffect } from 'react';
import { connectWallet, getAccount, getBalance } from '../services/ethereumService'; // Ensure these are correct
import { mintNFT, transferNFT, burnNFT } from './nftService'; // Ensure contract methods are working
import { Button, Input, Card } from './UIComponents'; // UI components

const EthereumInteraction = () => {
  const [account, setAccount] = useState('');  
  const [balance, setBalance] = useState('');  
  const [recipient, setRecipient] = useState('');
  const [tokenURI, setTokenURI] = useState('');
  const [tokenId, setTokenId] = useState('');

  // Load account and balance data if MetaMask is detected
  useEffect(() => {
    const loadAccountData = async () => {
      try {
        const acc = await getAccount();
        const bal = await getBalance();
        setAccount(acc);
        setBalance(bal);
      } catch (error) {
        console.error('Error fetching account data:', error);
      }
    };

    if (window.ethereum) {
      loadAccountData();
    } else {
      console.log("MetaMask is not installed.");
    }
  }, []);

  // Handle connect wallet button click
  const handleConnectWallet = async () => {
    try {
      const acc = await connectWallet(); // Request account connection
      const bal = await getBalance();    // Get the balance after connection
      setAccount(acc);                   // Update the account state
      setBalance(bal);                   // Update the balance state
    } catch (error) {
      console.error('Error connecting to wallet:', error);
    }
  };

  // Handle minting NFTs
  const handleMintNFT = async () => {
    try {
      const tx = await mintNFT(recipient, tokenURI);
      console.log('Mint successful:', tx);
    } catch (error) {
      console.error('Minting failed:', error);
    }
  };

  // Handle transferring NFTs
  const handleTransferNFT = async () => {
    try {
      const tx = await transferNFT(recipient, tokenId);
      console.log('Transfer successful:', tx);
    } catch (error) {
      console.error('Transfer failed:', error);
    }
  };

  // Handle burning NFTs
  const handleBurnNFT = async () => {
    try {
      const tx = await burnNFT(tokenId);
      console.log('Burn successful:', tx);
    } catch (error) {
      console.error('Burning failed:', error);
    }
  };

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Ethereum Interaction</h2>
      {account ? (
        <div>
          <p>Connected Account: {account}</p>
          <p>Balance: {balance} ETH</p>

          {/* Mint NFT */}
          <Card title="Mint NFT">
            <Input
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            <Input
              placeholder="Token URI"
              value={tokenURI}
              onChange={(e) => setTokenURI(e.target.value)}
            />
            <Button onClick={handleMintNFT}>Mint NFT</Button>
          </Card>

          {/* Transfer NFT */}
          <Card title="Transfer NFT">
            <Input
              placeholder="Recipient Address"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
            />
            <Input
              placeholder="Token ID"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
            />
            <Button onClick={handleTransferNFT}>Transfer NFT</Button>
          </Card>

          {/* Burn NFT */}
          <Card title="Burn NFT">
            <Input
              placeholder="Token ID"
              value={tokenId}
              onChange={(e) => setTokenId(e.target.value)}
            />
            <Button onClick={handleBurnNFT}>Burn NFT</Button>
          </Card>
        </div>
      ) : (
        <Button onClick={handleConnectWallet}>Connect Ethereum Wallet</Button>
      )}
    </div>
  );
};

export default EthereumInteraction;
