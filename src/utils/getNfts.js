export const loadNfts = async (wallet_address) => {
  return fetch(
    `https://eth-mainnet.alchemyapi.io/v2/demo/getNFTs/?owner=${wallet_address}`
  )
    .then((response) => response.json())
    .then((res) => {
      return res;
    });
};

export const getContractDetails = async (contract_address) => {
  return fetch(
    `https://eth-mainnet.g.alchemy.com/v2/demo/getContractMetadata/?contractAddress=${contract_address}`
  )
    .then((response) => response.json())
    .then((res) => {
      return res.contractMetadata.name;
    });
};
