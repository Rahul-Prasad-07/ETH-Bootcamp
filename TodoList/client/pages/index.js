import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

import TaskAbi from '../../backend/build/contracts/TaskContract.json'
import ConnectWalletButton from '../components/ConnectWalletButton'
import TodoList from '../components/TodoList'
import WrongNetworkMessage from '../components/WrongNetworkMessage'
import { TaskContractAddress } from '../config'

/* 
const tasks = [
  { id: 0, taskText: 'clean', isDeleted: false }, 
  { id: 1, taskText: 'food', isDeleted: false }, 
  { id: 2, taskText: 'water', isDeleted: true }
]
*/

export default function Home() {

  const [correctNetwork, setCorrectNetwork] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [currentAccount, setCurrentAccount] = useState('')


 

  // Calls Metamask to connect wallet on clicking Connect Wallet button
  const connectWallet = async () => {



    // check ethereum object exists on window(means Metamask is installed), if not, return
    // check the chainId and it's get it from the ethereum object, have method is "eth_chainId",console.log it
    // use stateVariables to set the chainId, set the chainId to the stateVariable
    // get accounts from ethereum object, have method is "eth_requestAccounts", console.log it
    // keep track of the accounts, set the accounts to the stateVariable

    // how to connect this fuction to the button? onClick={connectWallet}
    // while returning, pass this fuction to the ConnectWalletButton component--> connectWallet={connectWallet}
    // in the ConnectWalletButton component, pass the props to the button--> onClick={props.connectWallet}

    try {
      
      const { ethereum } = window;
      if (!ethereum ) {
        console.log('MetaMask is not detected');
        return;
      }
      
      const accounts = await ethereum.request({
        method: 'eth_requestAccounts'
      });
      console.log('Found account', accounts[0]);
      setIsUserLoggedIn(true)
      setCurrentAccount(accounts[0])


      const chainId = await ethereum.request({ method: 'eth_chainId' });
      console.log(chainId);

      const sepoliaChainId = '0xaa36a7'
      if(chainId !== sepoliaChainId){
        alert('you are not connected with Sepolia Network');
        console.log('Please switch to Sepolia Network');
        setCorrectNetwork(false)
      }
      else{
        setCorrectNetwork(true)
        console.log('you are connected with Sepolia Network');
      }


      
    } catch (error) {
      console.log(error);
      
    }

  }

  // Just gets all the tasks from the contract
  const getAllTasks = async () => {

  }

  // Add tasks from front-end onto the blockchain
  const addTask = async e => {

  }

  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
  const deleteTask = key => async () => {

  }
  return (
    <div className='bg-[#97b5fe] h-screen w-screen flex justify-center py-6'>
      {isUserLoggedIn ? (
        correctNetwork ? (
          <TodoList />
        ) : (
          <WrongNetworkMessage />
        )
      ) : (
        <ConnectWalletButton connectWallet={connectWallet} />
      )}
    </div>
  )
  
}

