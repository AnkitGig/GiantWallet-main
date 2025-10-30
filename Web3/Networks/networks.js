export const defaultNetworks = [
  // ===== Ethereum =====
  {
    name: "Ethereum Mainnet",
    chainId: 1,
    chainIdHex: "0x1",
    rpcUrl: "https://mainnet.infura.io/v3/d3054a1990e845d482ff031e55e939b2",
    blockExplorerUrl: "https://etherscan.io",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    symbol: "ETH",
    isDefault: true,
    isCustom: false,
    tags: ["ethereum", "mainnet"],
  },
  {
    name: "Ethereum Sepolia",
    chainId: 11155111,
    chainIdHex: "0xaa36a7",
    rpcUrl: "https://sepolia.infura.io/v3/d3054a1990e845d482ff031e55e939b2",
    blockExplorerUrl: "https://sepolia.etherscan.io",
    nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
    symbol: "ETH",
    isDefault: true,
    isCustom: false,
    tags: ["ethereum", "testnet"],
  },

  // ===== Linea =====
  {
    name: "Linea Mainnet",
    chainId: 59144,
    chainIdHex: "0xe708",
    rpcUrl: "https://linea-mainnet.infura.io/v3/d3054a1990e845d482ff031e55e939b2",
    blockExplorerUrl: "https://lineascan.build",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    symbol: "ETH",
    isDefault: true,
    isCustom: false,
    tags: ["linea", "mainnet"],
  },
  {
    name: "Linea Sepolia",
    chainId: 59141,
    chainIdHex: "0xe705",
    rpcUrl: "https://linea-sepolia.infura.io/v3/d3054a1990e845d482ff031e55e939b2",
    blockExplorerUrl: "https://sepolia.lineascan.build",
    nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
    symbol: "ETH",
    isDefault: true,
    isCustom: false,
    tags: ["linea", "testnet"],
  },

  // ===== Polygon =====
  {
    name: "Polygon Mainnet",
    chainId: 137,
    chainIdHex: "0x89",
    rpcUrl: "https://polygon-mainnet.infura.io/v3/d3054a1990e845d482ff031e55e939b2",
    blockExplorerUrl: "https://polygonscan.com",
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    symbol: "MATIC",
    isDefault: true,
    isCustom: false,
    tags: ["polygon", "mainnet"],
  },
  {
    name: "Polygon Amoy Testnet",
    chainId: 80002,
    chainIdHex: "0x13882",
    rpcUrl: "https://polygon-amoy.infura.io/v3/d3054a1990e845d482ff031e55e939b2",
    blockExplorerUrl: "https://amoy.polygonscan.com",
    nativeCurrency: { name: "MATIC", symbol: "MATIC", decimals: 18 },
    symbol: "MATIC",
    isDefault: true,
    isCustom: false,
    tags: ["polygon", "testnet"],
  },

  // ===== Base =====
  {
    name: "Base Mainnet",
    chainId: 8453,
    chainIdHex: "0x2105",
    rpcUrl: "https://base-mainnet.infura.io/v3/d3054a1990e845d482ff031e55e939b2",
    blockExplorerUrl: "https://basescan.org",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    symbol: "ETH",
    isDefault: true,
    isCustom: false,
    tags: ["base", "mainnet"],
  },
  {
    name: "Base Sepolia",
    chainId: 84532,
    chainIdHex: "0x14a34",
    rpcUrl: "https://base-sepolia.infura.io/v3/d3054a1990e845d482ff031e55e939b2",
    blockExplorerUrl: "https://sepolia.basescan.org",
    nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
    symbol: "ETH",
    isDefault: true,
    isCustom: false,
    tags: ["base", "testnet"],
  },

  // ===== Blast =====
  {
    name: "Blast Mainnet",
    chainId: 81457,
    chainIdHex: "0x13e31",
    rpcUrl: "https://blast-mainnet.infura.io/v3/d3054a1990e845d482ff031e55e939b2",
    blockExplorerUrl: "https://blastscan.io",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    symbol: "ETH",
    isDefault: true,
    isCustom: false,
    tags: ["blast", "mainnet"],
  },
  {
    name: "Blast Sepolia",
    chainId: 168587773,
    chainIdHex: "0xa7a",
    rpcUrl: "https://blast-sepolia.infura.io/v3/d3054a1990e845d482ff031e55e939b2",
    blockExplorerUrl: "https://sepolia.blastscan.io",
    nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
    symbol: "ETH",
    isDefault: true,
    isCustom: false,
    tags: ["blast", "testnet"],
  },

  // ===== Optimism =====
  {
    name: "Optimism Mainnet",
    chainId: 10,
    chainIdHex: "0xa",
    rpcUrl: "https://optimism-mainnet.infura.io/v3/d3054a1990e845d482ff031e55e939b2",
    blockExplorerUrl: "https://optimistic.etherscan.io",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    symbol: "ETH",
    isDefault: true,
    isCustom: false,
    tags: ["optimism", "mainnet"],
  },
  {
    name: "Optimism Sepolia",
    chainId: 11155420,
    chainIdHex: "0xaa37dc",
    rpcUrl: "https://optimism-sepolia.infura.io/v3/d3054a1990e845d482ff031e55e939b2",
    blockExplorerUrl: "https://sepolia-optimistic.etherscan.io",
    nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
    symbol: "ETH",
    isDefault: true,
    isCustom: false,
    tags: ["optimism", "testnet"],
  },

  // ===== Arbitrum =====
  {
    name: "Arbitrum Mainnet",
    chainId: 42161,
    chainIdHex: "0xa4b1",
    rpcUrl: "https://arbitrum-mainnet.infura.io/v3/d3054a1990e845d482ff031e55e939b2",
    blockExplorerUrl: "https://arbiscan.io",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    symbol: "ETH",
    isDefault: true,
    isCustom: false,
    tags: ["arbitrum", "mainnet"],
  },
  {
    name: "Arbitrum Sepolia",
    chainId: 421614,
    chainIdHex: "0x66eee",
    rpcUrl: "https://arbitrum-sepolia.infura.io/v3/d3054a1990e845d482ff031e55e939b2",
    blockExplorerUrl: "https://sepolia.arbiscan.io",
    nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
    symbol: "ETH",
    isDefault: true,
    isCustom: false,
    tags: ["arbitrum", "testnet"],
  },

  // ===== zkSync =====
  {
    name: "zkSync Mainnet",
    chainId: 324,
    chainIdHex: "0x144",
    rpcUrl: "https://zksync-mainnet.infura.io/v3/d3054a1990e845d482ff031e55e939b2",
    blockExplorerUrl: "https://explorer.zksync.io",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    symbol: "ETH",
    isDefault: true,
    isCustom: false,
    tags: ["zksync", "mainnet"],
  },
  {
    name: "zkSync Sepolia",
    chainId: 300,
    chainIdHex: "0x12c",
    rpcUrl: "https://zksync-sepolia.infura.io/v3/d3054a1990e845d482ff031e55e939b2",
    blockExplorerUrl: "https://sepolia.explorer.zksync.io",
    nativeCurrency: { name: "Sepolia Ether", symbol: "ETH", decimals: 18 },
    symbol: "ETH",
    isDefault: true,
    isCustom: false,
    tags: ["zksync", "testnet"],
  },

  // ===== BSC =====
  {
    name: "BNB Smart Chain Mainnet",
    chainId: 56,
    chainIdHex: "0x38",
    rpcUrl: "https://bsc-mainnet.infura.io/v3/d3054a1990e845d482ff031e55e939b2",
    blockExplorerUrl: "https://bscscan.com",
    nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
    symbol: "BNB",
    isDefault: true,
    isCustom: false,
    tags: ["bsc", "mainnet"],
  },
  {
    name: "BNB Smart Chain Testnet",
    chainId: 97,
    chainIdHex: "0x61",
    rpcUrl: "https://bsc-testnet.infura.io/v3/d3054a1990e845d482ff031e55e939b2",
    blockExplorerUrl: "https://testnet.bscscan.com",
    nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
    symbol: "BNB",
    isDefault: true,
    isCustom: false,
    tags: ["bsc", "testnet"],
  },

  // ===== opBNB =====
  {
    name: "opBNB Mainnet",
    chainId: 204,
    chainIdHex: "0xcc",
    rpcUrl: "https://opbnb-mainnet.infura.io/v3/d3054a1990e845d482ff031e55e939b2",
    blockExplorerUrl: "https://mainnet.opbnbscan.com",
    nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
    symbol: "BNB",
    isDefault: true,
    isCustom: false,
    tags: ["opbnb", "mainnet"],
  },
  {
    name: "opBNB Testnet",
    chainId: 5611,
    chainIdHex: "0x15eb",
    rpcUrl: "https://opbnb-testnet.infura.io/v3/d3054a1990e845d482ff031e55e939b2",
    blockExplorerUrl: "https://testnet.opbnbscan.com",
    nativeCurrency: { name: "BNB", symbol: "BNB", decimals: 18 },
    symbol: "BNB",
    isDefault: true,
    isCustom: false,
    tags: ["opbnb", "testnet"],
  },
];


import mongoose from "mongoose";
import {Network} from "../../models/network/network.js"

const seedDefaultNetworks = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    for (const network of defaultNetworks) {
      const exists = await Network.findOne({ chainId: network.chainId, isCustom: false });
      if (!exists) {
        await Network.create(network);
        console.log(`✅ Added: ${network.name}`);
      } else {
        console.log(`⚠️ Already exists: ${network.name}`);
      }
    }

    console.log("✅ Default networks seeding complete!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding default networks:", error);
    process.exit(1);
  }
};

seedDefaultNetworks();

