import React, { useState, useEffect } from 'react';
import './styles/globals.css';
import { Tabs, TabsList, TabsTrigger, TabsContent } from './components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from './components/ui/card';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Wallet, CreditCard, Send, Flame, Home, Folder, ShoppingBag, Moon, Sun } from 'lucide-react';
import { connectWallet, getAccount, getBalance } from './services/ethereumService';
import { connectTezosWallet, getTezosAccount, getTezosBalance } from './services/tezosService';
import { mintMeme, transferMeme, burnMeme } from './components/nftService';
import HomePage from './pages/home';
import MarketplacePage from './pages/Marketplace';
import MyCollectionPage from './pages/MyCollection';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useTheme } from 'next-themes';

function AppLayout() {
  const [activeTab, setActiveTab] = useState('home');
  const [ethereumAccount, setEthereumAccount] = useState('');
  const [ethereumBalance, setEthereumBalance] = useState('');
  const [tezosAccount, setTezosAccount] = useState('');
  const [tezosBalance, setTezosBalance] = useState('');
  const [recipientAddress, setRecipientAddress] = useState('');
  const [tokenId, setTokenId] = useState('');
  const [tokenUri, setTokenUri] = useState('');
  const [isWalletConnected, setIsWalletConnected] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const checkWalletConnection = async () => {
      try {
        const ethAccount = await getAccount();
        if (ethAccount) {
          setIsWalletConnected(true);
          setEthereumAccount(ethAccount);
          const balance = await getBalance(ethAccount);
          setEthereumBalance(balance);
        }
      } catch (error) {
        console.error('Error checking wallet connection:', error);
      }
    };
    checkWalletConnection();
  }, []);

  const handleConnectWallet = async () => {
    try {
      await connectWallet();
      const account = await getAccount();
      setEthereumAccount(account);
      const balance = await getBalance(account);
      setEthereumBalance(balance);
      setIsWalletConnected(true);
      toast.success('Wallet connected successfully!');
    } catch (error) {
      console.error('Error connecting wallet:', error);
      toast.error('Failed to connect wallet');
    }
  };

  const handleConnectTezos = async () => {
    try {
      await connectTezosWallet();
      const account = await getTezosAccount();
      setTezosAccount(account);
      const balance = await getTezosBalance(account);
      setTezosBalance(balance);
      toast.success('Tezos wallet connected successfully!');
    } catch (error) {
      console.error('Error connecting Tezos wallet:', error);
      toast.error('Failed to connect Tezos wallet');
    }
  };

  const handleMintMeme = async () => {
    try {
      await mintMeme(recipientAddress, tokenUri);
      toast.success('NFT minted successfully!');
    } catch (error) {
      console.error('Error minting NFT:', error);
      toast.error('Failed to mint NFT');
    }
  };

  const handleTransferMeme = async () => {
    try {
      await transferMeme(recipientAddress, tokenId);
      toast.success('NFT transferred successfully!');
    } catch (error) {
      console.error('Error transferring NFT:', error);
      toast.error('Failed to transfer NFT');
    }
  };

  const handleBurnMeme = async () => {
    try {
      await burnMeme(tokenId);
      toast.success('NFT burned successfully!');
    } catch (error) {
      console.error('Error burning NFT:', error);
      toast.error('Failed to burn NFT');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className="w-64 bg-card shadow-lg">
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-primary mb-6">MEME-COIN</h1>
            <nav className="space-y-4">
              <Button
                variant={activeTab === 'home' ? 'default' : 'ghost'}
                className="w-full justify-start text-left hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setActiveTab('home')}
              >
                <Home className="mr-3 h-5 w-5" /> Home
              </Button>
              <Button
                variant={activeTab === 'collections' ? 'default' : 'ghost'}
                className="w-full justify-start text-left hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setActiveTab('collections')}
              >
                <Folder className="mr-3 h-5 w-5" /> My Collections
              </Button>
              <Button
                variant={activeTab === 'marketplace' ? 'default' : 'ghost'}
                className="w-full justify-start text-left hover:bg-accent hover:text-accent-foreground transition-colors"
                onClick={() => setActiveTab('marketplace')}
              >
                <ShoppingBag className="mr-3 h-5 w-5" /> Marketplace
              </Button>
            </nav>
          </div>
          <div className="mt-auto p-6 border-t border-border">
            <Button
              variant="outline"
              className="w-full mb-4"
              onClick={handleConnectWallet}
              disabled={isWalletConnected}
            >
              {isWalletConnected ? 'Wallet Connected' : 'Connect Wallet'}
            </Button>
            <Button variant="ghost" className="w-full" onClick={toggleTheme}>
              {theme === 'dark' ? <Sun className="mr-2 h-4 w-4" /> : <Moon className="mr-2 h-4 w-4" />}
              {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
            </Button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto p-8">
        {activeTab === 'home' && (
          <div>
            <HomePage />

            {/* Ethereum and Tezos Tabs */}
            <Tabs defaultValue="ethereum" className="w-full mt-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="ethereum">Ethereum</TabsTrigger>
                <TabsTrigger value="tezos">Tezos</TabsTrigger>
              </TabsList>
              <TabsContent value="ethereum">
                <Card>
                  <CardHeader>
                    <CardTitle>Ethereum Wallet</CardTitle>
                    <CardDescription>Manage your Ethereum assets and NFTs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>Account:</strong> {ethereumAccount || 'Not connected'}</p>
                      <p><strong>Balance:</strong> {ethereumBalance || 'N/A'} ETH</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleConnectWallet} disabled={isWalletConnected}>
                      <Wallet className="mr-2 h-4 w-4" />
                      {isWalletConnected ? 'Wallet Connected' : 'Connect Ethereum Wallet'}
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="tezos">
                <Card>
                  <CardHeader>
                    <CardTitle>Tezos Wallet</CardTitle>
                    <CardDescription>Manage your Tezos assets</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p><strong>Account:</strong> {tezosAccount || 'Not connected'}</p>
                      <p><strong>Balance:</strong> {tezosBalance || 'N/A'} XTZ</p>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button onClick={handleConnectTezos}>
                      <Wallet className="mr-2 h-4 w-4" /> Connect Tezos Wallet
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>

            {/* NFT Operations */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>NFT Operations</CardTitle>
                <CardDescription>Mint, transfer, or burn NFTs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="recipient" className="block text-sm font-medium">Recipient Address</label>
                    <Input
                      id="recipient"
                      placeholder="0x..."
                      value={recipientAddress}
                      onChange={(e) => setRecipientAddress(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="tokenId" className="block text-sm font-medium">Token ID</label>
                    <Input
                      id="tokenId"
                      placeholder="Token ID"
                      value={tokenId}
                      onChange={(e) => setTokenId(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor="tokenUri" className="block text-sm font-medium">Token URI</label>
                    <Input
                      id="tokenUri"
                      placeholder="https://..."
                      value={tokenUri}
                      onChange={(e) => setTokenUri(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
              <Button
               onClick={handleMintMeme}
              disabled={!isWalletConnected}
               className="bg-green-500 hover:bg-green-600 text-primary-foreground dark:text-primary-foreground"
              >
               <CreditCard className="mr-2 h-4 w-4" />
                 Mint NFT
                </Button>
                <Button
              onClick={handleTransferMeme}
              disabled={!isWalletConnected}
              className="bg-blue-500 hover:bg-blue-600 text-primary-foreground dark:text-primary-foreground"
            >
              <Send className="mr-2 h-4 w-4" />
              Transfer NFT
            </Button>

            <Button
              onClick={handleBurnMeme}
              disabled={!isWalletConnected}
              className="bg-red-500 hover:bg-red-600 text-primary-foreground dark:text-primary-foreground"
            >
              <Flame className="mr-2 h-4 w-4" />
              Burn NFT
            </Button>
              </CardFooter>
            </Card>
          </div>
        )}

        {activeTab === 'collections' && <MyCollectionPage />}
        {activeTab === 'marketplace' && <MarketplacePage />}
      </div>
      <ToastContainer position="bottom-right" theme={theme} />
    </div>
  );
}

export default AppLayout;