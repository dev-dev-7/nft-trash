export const loadNfts = async (wallet_address) => {
  fetch(
    `https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/?owner=${wallet_address}`
  )
    .then((response) => response.json())
    .then((res) => {
      console.log("ressssss: ", res);
      return res;
    });
};
