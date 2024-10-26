// src/services/tezosService.js
import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet';

const Tezos = new TezosToolkit('https://mainnet.api.tez.ie');
const wallet = new BeaconWallet({ name: 'My Tezos DApp' });

Tezos.setWalletProvider(wallet);

export async function connectTezosWallet() {
  await wallet.requestPermissions({ network: { type: 'mainnet' } });
}

export async function getTezosAccount() {
  return await wallet.getPKH();
}

export async function getTezosBalance() {
  const address = await getTezosAccount();
  const balance = await Tezos.tz.getBalance(address);
  return balance.toNumber() / 1e6; // Convert from mutez to tez
}
