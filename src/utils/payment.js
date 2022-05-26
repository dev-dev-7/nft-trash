import axios from "axios";
import { connectWallet } from "../utils/wallet.js";
import {
  switchEthereumNetworkChain,
  switchBscNetworkChain,
} from "../utils/switchChainMetamask";
import { setStep, setPaymentData } from "../store/reducers/payment";
import { store } from "../store/index";
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");

// import { Moralis } from "react-moralis";
// const web3 = await Moralis.enableWeb3({ privateKey: "D1JixzgSYwqUG6a" });

// var Web3 = require("web3");
// var web3 = new Web3(
//   "https://eth-mainnet.alchemyapi.io/v2/yDtzlxB0DHCtArAN3baYN3aTJq2V1ML0"
// );

const contractABI = require("./abi.json");
let UserInputdata;
export const handlePay = async (data) => {
  UserInputdata = data;
  let web3;
  let Contract;
  let toAddress = "0x7Ab8330FbdDF839cA4aaB3200B9f315C36773438";
  let fromAddress = window.ethereum.selectedAddress;
  let finalAmount;
  if (window?.ethereum) {
    if (data.paymentChain === "BNB") {
      web3 = createAlchemyWeb3(
        "https://speedy-nodes-nyc.moralis.io/457a5aaa77ac98d99d72e0d9/bsc/mainnet"
      );
      // ADD / SWITCH BNB NETWORK
      await switchBscNetworkChain();
      finalAmount = web3.utils.toWei(data.amount.toString(), "ether");
    } else if (data.paymentChain === "ETH") {
      web3 = createAlchemyWeb3(
        "https://eth-mainnet.alchemyapi.io/v2/yDtzlxB0DHCtArAN3baYN3aTJq2V1ML0"
      );
      // SWITCH ETH NETWORK
      await switchEthereumNetworkChain();
      if (data.paymentCurrency === "DAI") {
        // finalAmount = data.amount * Math.pow(10, 6);
        finalAmount = web3.utils.toWei(data.amount.toString(), "ether");
      } else {
        finalAmount = data.amount * Math.pow(10, 6);
      }
    }
    Contract = await getContract(data, web3);
    let gasLimit = await web3.eth.estimateGas({
      from: fromAddress,
    });
    if (fromAddress) {
      if (data.paymentCurrency == "BNB" || data.paymentCurrency == "ETH") {
        alert(fromAddress);
        fetch(
          `https://min-api.cryptocompare.com/data/price?fsym=${data.paymentCurrency}&tsyms=BTC,USD,EUR`
        )
          .then((response) => response.json())
          .then((res) => {
            const result = parseFloat(+data.amount / +res.USD).toFixed(18);
            finalAmount = web3.utils.toWei(result.toString(), "ether");
            const txData = {
              from: fromAddress,
              to: toAddress,
              value: web3.utils.toHex(finalAmount),
              gas: gasLimit.toString(),
            };
            window.ethereum
              .request({
                method: "eth_sendTransaction",
                params: [txData],
              })
              .then((txHash) => {
                const runInterval = setInterval(async () => {
                  web3.eth
                    .getTransactionReceipt(txHash && txHash)
                    .then((txReceipt) => {
                      if (txReceipt == null) {
                      } else if (txReceipt && txReceipt.status === true) {
                        console.log("txReceipt: ", txReceipt);
                        clearInterval(runInterval);
                        return (data = axios
                          .post(
                            "https://rentnode.io/api/submit-order",
                            JSON.stringify({
                              wallet_address: fromAddress,
                              transaction_token: txReceipt.transactionHash,
                              type: UserInputdata.planType,
                              plan_name: UserInputdata.planName,
                              server_type: UserInputdata.chain,
                              ip_address: UserInputdata.ipAddress,
                            })
                          )
                          .then((response) => {
                            //success
                            if (response.data?.success) {
                              store.dispatch(
                                setPaymentData(response.data.data)
                              );
                              store.dispatch(setStep("4"));
                            } else {
                              store.dispatch(setStep("5"));
                            }
                          }));
                      } else if (txReceipt && txReceipt.status === false) {
                        store.dispatch(setStep("5"));
                        return {
                          status: "failed",
                          error: txReceipt,
                        };
                      }
                    });
                }, 5000);
              })
              .catch((error) => {
                store.dispatch(setStep("5"));
                return {
                  status: "failed",
                  error: error,
                };
              });
          });
      } else {
        return (data = await Contract.methods
          .transfer(fromAddress, finalAmount)
          .send({ from: fromAddress, gasLimit: gasLimit })
          .then((res) => {
            return (data = axios
              .post(
                "https://rentnode.io/api/submit-order",
                JSON.stringify({
                  wallet_address: fromAddress,
                  transaction_token: res.transactionHash,
                  type: UserInputdata.planType,
                  plan_name: UserInputdata.planName,
                  server_type: UserInputdata.chain,
                  ip_address: UserInputdata.ipAddress,
                })
              )
              .then((response) => {
                //success
                if (response.data?.success) {
                  store.dispatch(setPaymentData(response.data.data));
                  store.dispatch(setStep("4"));
                } else {
                  store.dispatch(setStep("5"));
                }
              }));
          })
          .catch((error) => {
            store.dispatch(setStep("5"));
            return {
              status: "failed",
              error: error,
            };
          }));
      }
    } else {
      const walletResponse = await connectWallet();
      return {
        status: "walletResponse",
        walletResponse: walletResponse,
      };
    }
  } else {
    const walletResponse = await connectWallet();
    return {
      status: "walletResponse",
      walletResponse: walletResponse,
    };
  }
};

const getContract = async (data, web3) => {
  let BUSDCONTRACTADDRESS = "0xe9e7cea3dedca5984780bafc599bd69add087d56";
  let USDTCONTRACTADDRESS = "0xdAC17F958D2ee523a2206206994597C13D831ec7";
  let USDCCONTRACTADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  let ETHDAI = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  let BSCDAI = "0x1AF3F329e8BE154074D8769D1FFa4eE058B1DBc3";
  let BSCUSDT = "0x55d398326f99059ff775485246999027b3197955";
  let BSCUSDC = "0x8AC76a51cc950d9822D68b83fE1Ad97B32Cd580d";
  let currentContractAddress;
  if (data.paymentChain == "BNB") {
    if (data.paymentCurrency == "BUSD") {
      currentContractAddress = BUSDCONTRACTADDRESS;
    } else if (data.paymentCurrency == "USDC") {
      currentContractAddress = BSCUSDC;
    } else if (data.paymentCurrency == "USDT") {
      currentContractAddress = BSCUSDT;
    } else if (data.paymentCurrency == "DAI") {
      currentContractAddress = BSCDAI;
    }
  } else if (data.paymentChain == "ETH") {
    if (data.paymentCurrency == "USDT") {
      currentContractAddress = USDTCONTRACTADDRESS;
    } else if (data.paymentCurrency == "USDC") {
      currentContractAddress = USDCCONTRACTADDRESS;
    } else if (data.paymentCurrency == "DAI") {
      currentContractAddress = ETHDAI;
    }
  }
  const contract = await new web3.eth.Contract(
    contractABI,
    currentContractAddress
  );
  return contract;
};
