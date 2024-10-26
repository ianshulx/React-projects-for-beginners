const { TezosToolkit } = require('@taquito/taquito');

const Tezos = new TezosToolkit('https://mainnet.api.tez.ie');

async function getTezosBalance(address) {
  return await Tezos.tz.getBalance(address);
}

module.exports = { getTezosBalance };
