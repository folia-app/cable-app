import { rpcsFor } from './rpc'

// No API key. Each chain's url is the head of the redundant keyless pool in
// ./rpc; code that needs failover should use that module directly rather than
// this single value.

export default {
  1: {
    name: 'ethereum',
    layer: 'ethereum',
    rpc: rpcsFor(1)[0],
    explorer: { name: 'Etherscan', domain: 'https://etherscan.io' },
    marketplace: { name: 'OpenSea', domain: 'https://opensea.io', assetPath: '/assets/ethereum'},
    movesMax: 4000
  },
  5: {
    name: 'goerli',
    layer: 'ethereum',
    rpc: rpcsFor(5)[0],
    explorer: {
      name: 'Etherscan',
      domain: 'https://goerli.etherscan.io' },
    marketplace: {
      name: 'OpenSea',
      domain: 'https://testnets.opensea.io',
      assetPath: '/assets/goerli'
    },
    chainInfo: {
      chainId: 5,
      chainName: 'Goerli',
      rpcUrls: ['https://eth-goerli.public.blastapi.io'],
      nativeCurrency: {
        name: 'Ether',
        symbol: 'ETH',
        decimals: 18,
      },
    },
    movesMax: 4000
  },
}