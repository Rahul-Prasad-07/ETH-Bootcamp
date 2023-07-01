import { ethers } from "ethers";
import { createContext, useEffect, useState } from "react";

export const TransactionContext = createContext();
const { ethereum } = window;

export const TransactionProvider = ({ children }) => {
  const [currentAccount, setCurrentAccount] = useState(""); //keep track of current account

  // use effect to run function on page load
  useEffect(() => {
    checkIfWalletIsConnected();
  }, []);

  //check if wallet is connected
  const checkIfWalletIsConnected = async () => {
    try {
      //make sure we have access to window.ethereum
      if (!ethereum) {
        return alert("Please install MetaMask");
      }

      // get accounts
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
      } else {
        console.log("No account found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // connectwallet
  const connectWallet = async () => {
    try {
      if (!ethereum) {
        return alert("Please install MetaMask");
      }

      // get accounts
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setCurrentAccount(accounts[0]);
      window.location.reload();
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };

  return (
    <TransactionContext.Provider value={{ connectWallet, currentAccount }}>
      {children}
    </TransactionContext.Provider>
  );
};
