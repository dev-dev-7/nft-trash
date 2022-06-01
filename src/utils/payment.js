import axios from "axios";
import { connectWallet } from "../utils/wallet.js";
import {
  switchEthereumNetworkChain,
  switchBscNetworkChain,
} from "../utils/switchChainMetamask";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
let nftTokenData;

export const handlePay = async (data) => {
  nftTokenData = data;
  let toAddress = "0x7Ab8330FbdDF839cA4aaB3200B9f315C36773438";
  let fromAddress = window.ethereum.selectedAddress;
  let finalAmount = 0.05;
  if (window?.ethereum) {
  } else {
    const walletResponse = await connectWallet();
    return {
      status: "walletResponse",
      walletResponse: walletResponse,
    };
  }
};
