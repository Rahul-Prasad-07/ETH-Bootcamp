import { createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3";

import createLotteryContract from "../Backend/utils/lotteryContract";

export const appContext = createContext();

export const AppProvider = ({ children }) => {
  const [address, setAddress] = useState(""); // keep trakc of the address
  const [web3, setWeb3] = useState(null); // keep track of the web3 instance
  const [lotteryContract, setLotteryContract] = useState(); // keep track state of lotteryContract bcz it can get updated

  const connectWallet = async () => {
    if (window !== "undefined" &&  window.ethereum !== "undefined") {
      try {
        // request wallet connection
        await window.ethereum.request({ method: "eth_requestAccounts" });

        // create web3 instance
        const web3 = new Web3(window.ethereum);
        setWeb3(web3);

        // get accounts
        const accounts = await web3.eth.getAccounts();
        setAddress(accounts[0]);
        setLotteryContract(createLotteryContract(web3));

        // when use change thier accounts, you need to get accounts and set it
        // automatically updated accounts without refreshing page
        window.ethereum.on("accountsChanged", async () => {
          const accounts = await web3.eth.getAccounts();
          setAddress(accounts[0]);
        });
      } catch (error) {
        console.log(error);
      }
    }else{
      console.log("Metamask is not installed")
    }
  };
  return (
    <appContext.Provider value={{ connectWallet, address }}>
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};
