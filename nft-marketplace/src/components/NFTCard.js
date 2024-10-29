import React from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Button } from "../components/ui/button"
import Badge from '../components/ui/badge';
import Tooltip from '../components/ui/tooltip';
import  {TooltipContent, TooltipProvider, TooltipTrigger } from "../components/ui/tooltip"
import { Eye, Heart, Share2 } from 'lucide-react'

const NFTCard = ({ tokenURI, owner, name, description, likes = 0 }) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <CardHeader className="p-0">
        <div className="relative aspect-square">
          <img 
            src={tokenURI} 
            alt={name || "NFT"} 
            className="object-cover w-full h-full"
          />
          <Badge className="absolute top-2 right-2 bg-black bg-opacity-50 text-white">
            #{tokenURI.split('/').pop()}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <CardTitle className="text-lg font-bold truncate">{name || "Unnamed NFT"}</CardTitle>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">{description || "No description available"}</p>
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 bg-gray-50 dark:bg-gray-800">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 truncate max-w-[150px]">
                {owner}
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>Owner: {owner}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <div className="flex space-x-2">
          <Button variant="ghost" size="icon">
            <Eye className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon">
            <Heart className="h-4 w-4" />
            <span className="ml-1 text-xs">{likes}</span>
          </Button>
          <Button variant="ghost" size="icon">
            <Share2 className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}

export default NFTCard
