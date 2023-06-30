//creat lottery helper function that connect smart contrat to frontend

// import contract address and abi
// import Web3 from 'web3'

import { contractABI, contractAddress } from './constants.js'

// create lotteryContract function that connect smart contract to frontend

const lotteryContract = web3 => {
    return new web3.eth.Contract(contractABI, contractAddress)
}

export default lotteryContract
// now we have access our lottery smart contract for or from frontend