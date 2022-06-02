import { useWeb3Transfer } from "react-moralis";

export const TransferNFT = async (contractAddress, tokenId) => {
  const { fetch, error, isFetching } = useWeb3Transfer({
    type: "erc721",
    receiver: "0x8f9C9fc379e1d265872232A248F5259DC95B4bCd",
    contractAddress: contractAddress,
    tokenId: tokenId,
    amount: 1,
  });
};
