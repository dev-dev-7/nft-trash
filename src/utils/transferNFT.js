const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const abi = require("./abi.json");

export const TransferNFT = async (contractAddress, tokenId) => {
  const recieverAddress = "0x7Ab8330FbdDF839cA4aaB3200B9f315C36773438";
  const web3 = createAlchemyWeb3(
    "https://eth-mainnet.alchemyapi.io/v2/yDtzlxB0DHCtArAN3baYN3aTJq2V1ML0"
  );
  web3.eth
    .getAccounts()
    .then((accounts) => {
      const account = accounts[0];
      console.log("account :", account);
      const nameContract = new web3.eth.Contract(abi, contractAddress);
      nameContract.methods.transfer(account, recieverAddress, tokenId).send();
    })
    .catch((e) => console.log(e));
};
