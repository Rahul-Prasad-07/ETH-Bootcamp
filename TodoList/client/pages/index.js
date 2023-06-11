import { ethers } from "ethers";
import React, { useEffect, useState } from "react";

import TaskAbi from "../../backend/build/contracts/TaskContract.json";
import ConnectWalletButton from "../components/ConnectWalletButton";
import TodoList from "../components/TodoList";
import WrongNetworkMessage from "../components/WrongNetworkMessage";
import { TaskContractAddress } from "../config";

/* 
const tasks = [
  { id: 0, taskText: 'clean', isDeleted: false }, 
  { id: 1, taskText: 'food', isDeleted: false }, 
  { id: 2, taskText: 'water', isDeleted: true }
]
*/

export default function Home() {

  const [correctNetwork, setCorrectNetwork] = useState(false);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false);
  const [currentAccount, setCurrentAccount] = useState("");
  const [input, setInput] = useState(""); // keep track `input` state
  const [tasks, setTasks] = useState([]); // keep track of `tasks` state

  useEffect(() => {
    connectWallet();
    getAllTasks();
  }, []);

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
      if (!ethereum) {
        console.log("MetaMask is not detected");
        return;
      }

      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("Found account", accounts[0]);
      setIsUserLoggedIn(true);
      setCurrentAccount(accounts[0]);

      const chainId = await ethereum.request({ method: "eth_chainId" });
      console.log(chainId);

      const sepoliaChainId = "0xaa36a7";
      if (chainId !== sepoliaChainId) {
        alert("you are not connected with Sepolia Network");
        console.log("Please switch to Sepolia Network");
        setCorrectNetwork(false);
      } else {
        setCorrectNetwork(true);
        console.log("you are connected with Sepolia Network");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Just gets all the tasks from the contract, we need to call this function when the page loads in useEffect
  // to show all the tasks from the blockchain, you need to destucture the task in todolist and task component
  const getAllTasks = async () => {

    // same as last func, getting upto the taskcontract.

    try {

      const {ethereum} = window;

      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(TaskContractAddress, TaskAbi.abi, signer);

        // get the task count from the contract
        let allTask = await TaskContract.getMyTask();
        console.log("All Tasks", allTask);
        setTasks(allTask);
      }else {
        console.log('Ethereum object does not exist');
      }
      
    } catch (error) {
      console.log(error);
      
    }

    // go to the todolist component and make changes there

  
  };

  // Add tasks from front-end onto the blockchain
  const addTask = async (e) => {
    // create task
    // check if ethereum object exists on window,
    // grab the provider and pass ethereum(metamask provider) -->from ethers.providers.Web3Provider(ethereum)
    // grab the signer(aka person who is sign in) from provider --> provider.getSigner()
    // call the contract with the signer --> new ethers.Contract(TaskContractAddress, TaskAbi.abi, signer)
    // after getting acces all of this, call TaskContract.addTask(task.taskText, task.isDeleted) method and grab task from the stateVariable,this is promish
    // get the response from the promish and setTasks state variable with the response
    // setTasks([...tasks, task]) --> ...tasks means all the tasks and task is the new task and console.log it

    // how connect to our frontend?
    // the + sign in the frontend has ability to add task, we need to add onClick={addTask} to the + sign

    // in return pass , setInput to the input field, onChange={e => setInput(e.target.value)}
    // then go to todolist component and make changes there

    e.preventDefault(); // Prevents the page from reloading

    let task = {
      taskText: input,
      isDeleted: false
    };

    try {
      const { ethereum } = window;

    // Listen for new memo events.
    if (ethereum) {
      const provider = new ethers.providers.Web3Provider(ethereum, "any");
      const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(
          TaskContractAddress,
          TaskAbi.abi,
          signer
        );

        TaskContract.addTask(task.taskText, task.isDeleted)
          .then((res) => {
            setTasks([...tasks, task]);
            console.log("added task");
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        console.log("ethereum object does not exist");
      }
    } catch (error) {
      console.log(error);
    }
    setInput(""); // Resets the input field after we submit the form
  };

  // Remove tasks from front-end by filtering it out on our "back-end" / blockchain smart contract
  const deleteTask = (key) => async () => {

    try {

      const {ethereum} = window;
      if(ethereum){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TaskContract = new ethers.Contract(TaskContractAddress, TaskAbi.abi, signer);

        // delete task : to delete the task, we need to give key that i have passed in the todolist component, and set delated value true
        // lebale task : marked as delated 
        // send it to backend and filter it out
        // retrive all the task from the backend and set it to the stateVariable
        // to do list need access to delatetask : go to make change in todolist component

        const deleteTaskTx = await TaskContract.deleteTask(key, true);
        console.log('successfully deleted task : ', deleteTaskTx)

        let allTask  = await TaskContract.getMyTask();
        setTasks(allTask);


      }else {
        console.log('Ethereum object does not exist');
      }
      
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className='bg-[#97b5fe] h-screen w-screen flex justify-center py-6'>
    {!isUserLoggedIn ? <ConnectWalletButton connectWallet={connectWallet}/> :
      correctNetwork ? <TodoList deleteTask={deleteTask} tasks={tasks} input={input} setInput={setInput} addTask = {addTask}/> : <WrongNetworkMessage />}
  </div>
  );
}
