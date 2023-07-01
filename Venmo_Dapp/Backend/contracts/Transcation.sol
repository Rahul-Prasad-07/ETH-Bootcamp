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

    
}