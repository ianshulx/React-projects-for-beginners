import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { PlusCircle } from 'lucide-react';
import NFTList from '../components/NFTList';  // Import NFTList component

export default function MyCollection() {
  const contractAddress = '0x903c9b908a9FCb1C799ED97FEa382811CFB77C6c';  // Replace with your actual contract address

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-6">As dope as me</h1>
      <p className="text-xl mb-8">Your personal NFT collection is displayed here.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Render the NFTList here */}
        <NFTList contractAddress={contractAddress} />
        
        {/* Add New NFT Button */}
        <Card className="flex items-center justify-center">
          <Button variant="ghost" className="h-full w-full flex flex-col items-center justify-center">
            <PlusCircle className="h-12 w-12 mb-2" />
            <span>Add New NFT</span>
          </Button>
        </Card>
      </div>
    </div>
  );
}
