import { createContext, useContext, useEffect, useState } from "react";
import Web3 from "web3";

import createLotteryContract from "../utils/lotteryContract";

export const appContext = createContext();

export const AppProvider = ({ children }) => {
  const [address, setAddress] = useState(""); // keep trakc of the address
  const [web3, setWeb3] = useState(null); // keep track of the web3 instance
  const [lotteryContract, setLotteryContract] = useState(); // keep track state of lotteryContract bcz it can get updated
  const [lotteryPot, setLotteryPot] = useState('0 ETH'); // keep track of the lottery pot
  const [lotteryPlayers, setLotteryPlayers] = useState([]); // keep track of the lottery players
  const [lastWinner, setLastWinner] = useState([]); // keep track of the last winner
  const [lotteryId, setLotteryId] = useState(); // keep track of the lottery id
 
 useEffect (()=>{
  updateLottery()
 },[lotteryContract])
 
// Update Lottery Card dynamically using our smart contract: use useEffect bcz whenever the lotteryContract changes, we want to update the lottery pot
 const updateLottery = async ()=>{

  if(lotteryContract){
    const pot = await lotteryContract.methods.getBlance().call(); //get in wei
    setLotteryPot(web3.utils.fromWei(pot, 'ether') + ' ETH');

    // update players
    setLotteryPlayers(await lotteryContract.methods.getPlayers().call())
    console.log(lotteryPlayers);
    
    // update last winner
    setLastWinner(await lotteryContract.methods.getWinners().call())
    console.log([...lastWinner], "last winner" );
  }
 

}


  // connect wallet
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

  // Enter Lottery
  const enterLottery = async () => {
    try {

      await lotteryContract.methods.enter().send({
        from: address,
        value: web3.utils.toWei("0.1", "ether"),
        gas : 3000000,
        gasPrice : null,
      })
      
    } catch (error) {
      console.log(error)
      
    }
  }
  // Pick Winner
  const pickWinner = async ()=>{
     
    try {
      let transction = await lotteryContract.methods.pickWinner().send({
        from:address,
        gas:3000000,
        gasPrice:null
      })
      console.log(transction);
      updateLottery()  // when pickwinner func call, it checks if you are owner then able to call this func and then update the lottery card and change details
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <appContext.Provider value={{ connectWallet, address, enterLottery, lotteryPot, lotteryPlayers, pickWinner, lastWinner }}>
      {children}
    </appContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(appContext);
};
