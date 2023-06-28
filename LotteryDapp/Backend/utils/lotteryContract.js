//creat lottery helper function that connect smart contrat to frontend

// import contract address and abi
import Web3 from 'web3'
import { contractAddress, contractABI } from './constants.js'

// create lotteryContract function that connect smart contract to frontend

const lotteryContract = async () => {
    return new Web3.eth.Contract(contractABI, contractAddress)
}

// now we have access our lottery smart contract for or from frontend