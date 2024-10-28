import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { ShoppingCart } from 'lucide-react'

const Container = ({ children }) => (
  <div className="container mx-auto px-4 py-8">{children}</div>
);

const Title = ({ children }) => (
  <h1 className="text-4xl font-bold mb-6">{children}</h1>
);

const NFTCard = ({ name, image, price, creator }) => (
  <Card className="overflow-hidden">
    <CardHeader>
      <CardTitle className="text-lg">{name}</CardTitle>
      <CardDescription>Created by: {creator}</CardDescription>
    </CardHeader>
    <CardContent>
      <img src={image} alt={name} className="w-full h-48 object-cover rounded-md" />
    </CardContent>
    <CardFooter className="flex justify-between items-center">
      <span className="font-bold">{price} ETH</span>
      <Button variant="default" size="sm">
        <ShoppingCart className="mr-2 h-4 w-4" />
        Buy Now
      </Button>
    </CardFooter>
  </Card>
);

export default function Marketplace() {
  const nfts = [
    { id: 1, name: "Cosmic Kitty", image: "/placeholder.svg?height=200&width=200", price: 0.5, creator: "CryptoArtist" },
    { id: 2, name: "Digital Dreamscape", image: "/placeholder.svg?height=200&width=200", price: 0.7, creator: "NFTMaster" },
    { id: 3, name: "Neon Nebula", image: "/placeholder.svg?height=200&width=200", price: 0.3, creator: "PixelPioneer" },
    { id: 4, name: "Pixel Paradise", image: "/placeholder.svg?height=200&width=200", price: 0.6, creator: "BlockchainBob" },
  ];

  return (
    <Container>
      <Title>Marketplace</Title>
      <p className="text-xl mb-8">Discover and collect unique digital assets.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {nfts.map((nft) => (
          <NFTCard key={nft.id} {...nft} />
        ))}
      </div>
    </Container>
  );
}