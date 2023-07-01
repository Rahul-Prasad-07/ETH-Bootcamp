// SPDX-License-Identifier:UNLICENSE

pragma solidity ^0.8.15;

contract Transcation {

    // Number of Tx
    uint256 transcationCount;

    // this will be event that will be fired when a new transcation is created
    event Transfer(address from, address receiver, uint amount, string message, uint timestamp);

    // struct to store transcation details on chain
    struct TransferStruct{
        address sender;
        address receiver;
        uint amount;
        string message;
        uint256 timestamp;

    }

    // array of transcation struct
    TransferStruct[] transcations; // [{reciver:0xa..,amount:100,message:"hello",timestamp:1234567890},{reciver:0xa..,amount:100,message:"hello",timestamp:1234567890}]
    
    // function to add a transcation to the blockchain with our struct
    // payable keyword here means that the receiver is able to receive ether by sender

    function addToBlockchain(address payable receiver, uint amount, string memory message) public {

        // increase the transcation count
        transcationCount++;

        //push TransferStruct struct into transcations array
        transcations.push(TransferStruct(msg.sender, receiver, amount, message, block.timestamp));

        // emit the event that we created 
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp);

    }

    // function to get all transcations
    function getAllTranscations() public view returns(TransferStruct[] memory){
        return transcations;
    }

    //view keyword means that func can only be used to read data from blockchain
    // therefor no ether needed to run the functions

    

    
}