const { ethers } = require("ethers");
const abi = require("./abi.json");
const toAddress = "0x7Ab8330FbdDF839cA4aaB3200B9f315C36773438";

export const TransferNFT = async (fromAddress, contractAddress, tokenId) => {
  const provider = new ethers.providers.JsonRpcProvider(
    "https://eth-mainnet.alchemyapi.io/v2/LApVWGPVMClnLPZbxsjVQJhN9_5fLZUN"
  );
  const wallet = new ethers.Wallet(
    "ea2a0ea836c7f8c91341be89fd17601ac078b5f150e4cb3dec1d180691b2e9ff",
    provider
  );
  console.log("wallet:", wallet);
  //Get gas price
  const gasPrice = await provider.getGasPrice();
  //Grab contract ABI and create an instance
  const nftContract = new ethers.Contract(contractAddress, abi, wallet);
  //Estimate gas limit
  const gasLimit = await nftContract.estimateGas[
    "safeTransferFrom(address,address,uint256)"
  ](fromAddress, toAddress, tokenId, { gasPrice });
  //Call the safetransfer method
  const transaction = await nftContract[
    "safeTransferFrom(address,address,uint256)"
  ](fromAddress, toAddress, tokenId, { gasLimit });
  //Wait for the transaction to complete
  await transaction.wait();
  console.log("Transaction Hash: ", transaction.hash);
};
