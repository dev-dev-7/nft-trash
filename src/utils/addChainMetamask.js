// Below funtion throwing error: MetaMask - RPC Error: May not specify default MetaMask chain.
export const addEthereumNetworkChain = async (rpcurl) => {
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x1",
          chainName: "Ethereum Private node by RentNode.io",
          nativeCurrency: {
            name: "Ethereum",
            symbol: "ETH",
            decimals: 18,
          },
          rpcUrls: [rpcurl],
          blockExplorerUrls: ["https://etherscan.com/"],
        },
      ],
    });
  } catch (addError) {
    console.log("add eth err log :", addError);
  }
};

export const addBscNetworkChain = async (rpcurl) => {
  console.log("rpcurl ===", rpcurl);
  try {
    await window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: [
        {
          chainId: "0x38",
          chainName: "Binance Private node by RentNode.io",
          nativeCurrency: {
            name: "Binance",
            symbol: "BNB",
            decimals: 18,
          },
          rpcUrls: [rpcurl],
          blockExplorerUrls: ["https://bscscan.com/"],
        },
      ],
    });
  } catch (addError) {
    console.log("add bnb err log :", addError);
  }
};

export const addCroNetworkChain = async (rpcurl) => {
  console.log("rpcurl :", rpcurl);
  // "https://evm.cronos.org/
  if (window.ethereum) {
    await window.ethereum
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x19", //
            chainName: "Cronos Mainnet",
            nativeCurrency: {
              name: "CRONOS",
              symbol: "CRO",
              decimals: 18,
            },
            rpcUrls: ["https://evm.cronos.org"],
            blockExplorerUrls: ["https://cronoscan.com/"],
          },
        ],
      })
      .catch((error) => {
        console.log(error);
      });
  }
};
