import { ethers } from 'ethers';
let provider;
let signer;
// Replace with actual address



// Initialize provider using ethers.js v6
// Initialize provider using ethers.js v6
if (typeof window.ethereum !== 'undefined') {
  provider = new ethers.BrowserProvider(window.ethereum); // ethers.js v6
}


// Function to connect the wallet
export async function connectWallet() {
  if (!provider) {
    throw new Error("Ethereum wallet is not available. Please install MetaMask or another wallet.");
  }

  await provider.send("eth_requestAccounts", []); // Request wallet connection
  signer = await provider.getSigner(); // Get the signer for transactions
}

// Get the current account address
export async function getAccount() {
  if (!provider) {
    throw new Error("Ethereum wallet is not available.");
  }

  if (!signer) {
    signer = await provider.getSigner(); // Re-fetch signer if it's not available
  }

  return await signer.getAddress(); // Use getAddress() method in ethers.js v6
}

// Get the balance of the connected account
export async function getBalance() {
  if (!signer) {
    throw new Error("Signer is not available. Make sure the wallet is connected.");
  }

  const balance = await provider.getBalance(await signer.getAddress()); // Fetch balance using getAddress()
  return ethers.formatEther(balance); // Use ethers.formatEther in ethers.js v6
}

// Function to fetch NFTs (tokenURI and owner)
export async function fetchNFTs(contractAddress, tokenId) {
  if (!provider) {
    throw new Error("Ethereum provider is not initialized.");
  }

  const abi = [
    "function tokenURI(uint256 tokenId) external view returns (string memory)",
    "function ownerOf(uint256 tokenId) external view returns (address)"
  ];

  const contract = new ethers.Contract(contractAddress, abi, provider);
  const tokenURI = await contract.tokenURI(tokenId);
  const owner = await contract.ownerOf(tokenId);

  return { tokenURI, owner };
}
