import { ethers } from 'ethers';

// Contract details
const CONTRACT_ADDRESS = '0x903c9b908a9FCb1C799ED97FEa382811CFB77C6c';
const ETHERLINK_RPC_URL = 'https://etherlink-testnet.rpc-url.com';  // Replace with the actual Etherlink RPC URL

// ABI (unchanged, with mint, burn, transfer functions)
const abi = [
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "burnMeme",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "tokenURI",
        "type": "string"
      }
    ],
    "name": "mintMeme",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "transferMeme",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "getApproved",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "ownerOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "tokenId",
        "type": "uint256"
      }
    ],
    "name": "tokenURI",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Initialize ethers with the user's MetaMask wallet for Ethereum or custom provider for Etherlink
export const initializeProvider = async (network = 'ethereum') => {
  try {
    let provider;
    if (network === 'etherlink') {
      provider = new ethers.JsonRpcProvider(ETHERLINK_RPC_URL); // Etherlink testnet provider
    } else if (typeof window.ethereum !== 'undefined') {
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      provider = new ethers.BrowserProvider(window.ethereum); // Ethereum mainnet via MetaMask
    } else {
      throw new Error('MetaMask is not installed for Ethereum mainnet');
    }
    
    return provider;
  } catch (error) {
    console.error('Error initializing provider:', error);
    throw error;
  }
};
export const getConnectedAddress = async () => {
  try {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []); // Request account access
      return accounts[0];  // Return the first connected account
    } else {
      console.error("MetaMask is not installed!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching connected address:", error);
    return null;
  }
};

// Get contract instance based on the network
export const getContract = async (network = 'ethereum') => {
  try {
    const provider = await initializeProvider(network);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

    console.log("Contract instance:", contract);
    return contract;
  } catch (error) {
    console.error("Error initializing contract:", error);
  }
};

// Mint an NFT
export const mintMeme = async (tokenURI, network = 'ethereum') => {
  try {
    const contract = await getContract(network);
    if (!contract) throw new Error("Contract is not initialized");

    const tx = await contract.mintMeme(tokenURI);
    await tx.wait();

    return tx;
  } catch (error) {
    console.error("Error minting NFT:", error);
    throw error;
  }
};

// Transfer an NFT
export const transferMeme = async (recipient, tokenId, network = 'ethereum') => {
  try {
    const contract = await getContract(network);
    const tx = await contract.transferMeme(recipient, tokenId);
    await tx.wait();

    return tx;
  } catch (error) {
    console.error("Error transferring NFT:", error);
    throw error;
  }
};

// Burn an NFT
export const burnMeme = async (tokenId, network = 'ethereum') => {
  try {
    const contract = await getContract(network);
    const tx = await contract.burnMeme(tokenId);
    await tx.wait();

    return tx;
  } catch (error) {
    console.error("Error burning NFT:", error);
    throw error;
  }
};

// Fetch NFTs
export const fetchNFTs = async (contractAddress, tokenId, network = 'ethereum') => {
  try {
    const contract = await getContract(network);
    const tokenURI = await contract.tokenURI(tokenId);
    const owner = await contract.ownerOf(tokenId);
    
    return { tokenURI, owner };
  } catch (error) {
    console.error("Error fetching NFT:", error);
    throw error;
  }
};
