// src/web3Provider.js
import { ethers } from 'ethers';

let provider;
if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum);
} else {
    console.log("MetaMask not detected. Please install MetaMask!");
}

export default provider;
