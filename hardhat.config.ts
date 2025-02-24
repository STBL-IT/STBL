import './tasks'
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-deploy";
import "@nomicfoundation/hardhat-verify";
import "hardhat-contract-sizer";
import "@primitivefi/hardhat-dodoc";
import '@openzeppelin/hardhat-upgrades';
import 'hardhat-abi-exporter';
import "hardhat-tracer";

import * as dotenv from 'dotenv'
import { HardhatUserConfig } from 'hardhat/types'

dotenv.config()

if (!process.env.PRIVATE_KEY) {
  throw new Error('Please set your PRIVATE_KEY in a .env file')
}

const config: HardhatUserConfig = {
  solidity: {
    version: '0.8.25',
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },

  networks: {
    sepolia: {
      url: process.env.SEPOLIA_URL ?? '',
      accounts: [process.env.PRIVATE_KEY],

    },

    holesky: {
      url: process.env.HOLESKY_URL ?? '',
      accounts: [process.env.PRIVATE_KEY]
    },

    ethereum: {
      url: process.env.ETHEREUM_URL ?? '',
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 17 * 10 ** 9
    },

    stbl: {
      url: process.env.STBL_URL ?? '',
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 0
    },
    stbl_dev: {
      url: process.env.STBL_DEV_URL ?? '',
      accounts: [process.env.PRIVATE_KEY],
      gasPrice: 0
    }
  },

  contractSizer: {
    alphaSort: true,
    runOnCompile: false,
    disambiguatePaths: false,
  },

  gasReporter: {
    currency: 'USD',
    gasPrice: 21,
    enabled: true,
  },

  abiExporter: {
    path: './abis',
    runOnCompile: true,
    clear: true,
    flat: true,
    only: [],
    spacing: 2,
    pretty: false,
  },

  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
    customChains: [
      {
        network: "stbl",
        chainId: 505050,
        urls: {
          apiURL: "https://explorer.quorum.sps.stage.kode.ru/api",
          browserURL: "https://explorer.quorum.sps.stage.kode.ru/"
        }
      },
      {
        network: "stbl_dev",
        chainId: 50505,
        urls: {
          apiURL: "https://explorer.quorum.sps.dev.kode.ru/api",
          browserURL: "https://explorer.quorum.sps.dev.kode.ru/"
        }
      }
    ]
  },
  sourcify: {
    enabled: false,
  }
}

export default config