const { ethers } = require('ethers');

const provider = new ethers.providers.JsonRpcProvider(process.env.ETHEREUM_RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider);

async function getBalance() {
  const balance = await wallet.getBalance();
  return ethers.utils.formatEther(balance);
}

module.exports = { getBalance };
