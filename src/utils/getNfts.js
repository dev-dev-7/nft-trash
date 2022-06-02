export const loadNfts = async (wallet_address) => {
  console.log("calinggggg");
  return fetch(
    `https://eth-mainnet.alchemyapi.io/v2/wk28q9z1rs6i73qyb89ecsyyct5rvfwf/getNFTs/?owner=${wallet_address}`
  )
    .then((response) => response.json())
    .then((res) => {
      return res;
    });
};

export const getContractDetails = async (contract_address) => {
  return fetch(
    `https://eth-mainnet.alchemyapi.io/v2/wk28q9z1rs6i73qyb89ecsyyct5rvfwf/getContractMetadata/?contractAddress=${contract_address}`
  )
    .then((response) => response.json())
    .then((res) => {
      return res?.contractMetadata?.name
        ? res.contractMetadata.name
        : "no name";
    });
};
