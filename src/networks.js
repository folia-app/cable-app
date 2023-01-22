const infuraProjectID = import.meta.env?.VITE_APP_INFURA_PROJECT_ID || process.env.VITE_APP_INFURA_PROJECT_ID

export default {
  1: {
    name: 'ethereum',
    layer: 'ethereum',
    infura: `https://mainnet.infura.io/v3/${infuraProjectID}`,
    explorer: { name: 'Etherscan', domain: 'https://etherscan.io' },
    marketplace: { name: 'OpenSea', domain: 'https://opensea.io', assetPath: '/assets/ethereum' },
    movesMax: 4000
  },
  1337: {
    name: 'goerli',
    layer: 'ethereum',
    // infura: `https://goerli.infura.io/v3/${infuraProjectID}`,
    infura: `http://localhost:8545`,
    explorer: {
      name: 'Etherscan',
      domain: 'https://goerli.etherscan.io'
    },
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