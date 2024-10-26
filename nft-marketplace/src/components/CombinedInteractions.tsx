import React, { useState, useEffect } from 'react'
import { Box, VStack, Heading, Text, Button, Input, Card, CardBody, Stack, StackDivider } from '@chakra-ui/react'
import TezosInteraction from './TezosInteraction'
import EthereumInteraction from './EthereumInteraction'
import { connectWallet as connectEthereumWallet, getAccount as getEthereumAccount, getBalance as getEthereumBalance } from '../services/ethereumService'
import { connectTezosWallet, getTezosAccount, getTezosBalance } from '../services/tezosService'

export default function CombinedInteractions() {
  const [activeNetwork, setActiveNetwork] = useState<'ethereum' | 'tezos' | null>(null)
  const [ethereumAccount, setEthereumAccount] = useState('')
  const [ethereumBalance, setEthereumBalance] = useState('')
  const [tezosAccount, setTezosAccount] = useState('')
  const [tezosBalance, setTezosBalance] = useState('')

  useEffect(() => {
    if (activeNetwork === 'ethereum') {
      handleConnectEthereum()
    } else if (activeNetwork === 'tezos') {
      handleConnectTezos()
    }
  }, [activeNetwork])

  const handleConnectEthereum = async () => {
    try {
      await connectEthereumWallet()
      const account = await getEthereumAccount()
      const balance = await getEthereumBalance()
      setEthereumAccount(account)
      setEthereumBalance(balance)
    } catch (error) {
      console.error('Error connecting to Ethereum wallet:', error)
    }
  }

  const handleConnectTezos = async () => {
    try {
      await connectTezosWallet()
      const account = await getTezosAccount()
      const balance = await getTezosBalance()
      setTezosAccount(account)
      setTezosBalance(balance.toString())
    } catch (error) {
      console.error('Error connecting to Tezos wallet:', error)
    }
  }

  return (
    <Box maxWidth="800px" margin="auto" padding={4}>
      <VStack spacing={6} align="stretch">
        <Heading as="h1" size="xl" textAlign="center">
          MEME-COIN Interactions
        </Heading>
        
        <Card>
          <CardBody>
            <Stack divider={<StackDivider />} spacing="4">
              <Box>
                <Heading size="md" mb={4}>
                  Select Network
                </Heading>
                <Button colorScheme="blue" onClick={() => setActiveNetwork('ethereum')} mr={2}>
                  Ethereum
                </Button>
                <Button colorScheme="teal" onClick={() => setActiveNetwork('tezos')}>
                  Tezos
                </Button>
              </Box>
              
              {activeNetwork === 'ethereum' && (
                <Box>
                  <Heading size="md" mb={4}>
                    Ethereum Interaction
                  </Heading>
                  <Text>Account: {ethereumAccount}</Text>
                  <Text>Balance: {ethereumBalance} ETH</Text>
                  <EthereumInteraction />
                </Box>
              )}
              
              {activeNetwork === 'tezos' && (
                <Box>
                  <Heading size="md" mb={4}>
                    Tezos Interaction
                  </Heading>
                  <Text>Account: {tezosAccount}</Text>
                  <Text>Balance: {tezosBalance} XTZ</Text>
                  <TezosInteraction />
                </Box>
              )}
            </Stack>
          </CardBody>
        </Card>
      </VStack>
    </Box>
  )
}