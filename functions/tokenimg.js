import myContract from '../contracts/Metadata'
import networks from '../src/networks'
// ethers v5 has no ESM default export; the named one is canonical. This only
// worked under the old bundler via CommonJS interop.
import { ethers } from 'ethers'
require('dotenv').config()
const chainId = process.env.VITE_APP_FALLBACK_NETWORK_ID ?? 1

export async function handler (event, context) {
  try {
    const path = event.path.split('/')
    // const chainId = path[path.length - 2]
    // parse tokenId from last part ("/1", "1.png", "/1_3333.png")
    const tokenId = path[path.length - 1].split('.')[0].split('_')[0]
    
    // size (default is social share size)
    let size = event.queryStringParameters.width || 144 * 8
    size = Number(size)
    
    const deployAddress = myContract.networks[chainId]?.address
    
    if (!deployAddress || !networks[chainId]?.rpc) {
      throw new Error(`no contract on chain: ${chainId}`)
    }

    const provider = new ethers.getDefaultProvider(networks[chainId].rpc)
    const contract = new ethers.Contract(deployAddress, myContract.abi, provider)

    const svg = await contract.getSVG(tokenId)
    const base64 = svg.split(',').pop()   
  
    return {
      statusCode: 200,
      isBase64Encoded: true,
      body: base64, 
      headers: {
        'Content-Type': 'image/svg'
      }
    }
  } catch (e) {
    console.error(e)
    
    return {
      statusCode: 500,
      body: e.message
    }
  }
}