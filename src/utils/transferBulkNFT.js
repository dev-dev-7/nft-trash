const { ethers } = require("ethers");
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const abi = require("./abi.json");
const recieveAddress = "0x7Ab8330FbdDF839cA4aaB3200B9f315C36773438";

const NFT_LIST = [];
let web3;

export const transferBulkNFT = async (Nfts) => {
  web3 = createAlchemyWeb3(
    "https://eth-mainnet.alchemyapi.io/v2/yDtzlxB0DHCtArAN3baYN3aTJq2V1ML0"
  );

  console.log("web3: ", web3);

  if (Nfts.length > 0) {
    for (let i = 0; i < Nfts.length; i++) {
      NFT_LIST.push({
        contract: Nfts[i].contract,
        tokenId: Nfts[i].token.tokenId,
      });
    }
  }
  console.log(NFT_LIST);
};
