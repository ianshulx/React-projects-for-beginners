// src/components/NFTList.js
import React, { useEffect, useState } from 'react';
import NFTCard from './NFTCard';
import { fetchNFTs, getConnectedAddress, getContract } from './nftService';  // Import getContract

const NFTList = ({ contractAddress }) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    const loadNFTs = async () => {
      const nftData = [];
      const connectedAddress = await getConnectedAddress(); // Get the connected wallet address
      const contract = await getContract();  // Get the contract instance
  
      for (let i = 1; i <= 5; i++) {  // Fetch first 5 NFTs
        try {
          const nft = await fetchNFTs(contractAddress, i);
          const owner = await contract.ownerOf(i);  // Fetch the owner of the token
  
          if (owner.toLowerCase() === connectedAddress.toLowerCase()) {
            nftData.push(nft);  // Add NFT to the array if the connected wallet is the owner
          }
        } catch (error) {
          console.error(`Error fetching NFT with tokenId ${i}:`, error);
        }
      }
      setNfts(nftData);
    };
    
    loadNFTs();
  }, [contractAddress]);

  return (
    <div>
      {nfts.map((nft, index) => (
        <NFTCard key={index} tokenURI={nft.tokenURI} owner={nft.owner} />
      ))}
    </div>
  );
};

export default NFTList;
