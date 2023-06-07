// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

contract DataTypes {

    // define variables of diff types

    uint256 myUint = 123;
    bool myBool = true;
    string myString = "Hello World";
    address payable myAddress = payable(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4);
    bytes32 myBytes32 = "Hello World";


    // define diff types of arrays

    uint256[] myUintArr = [1,2,3];
    bool[] myBoolArr = [true, false, true];
    string[] mystringArray = ["Hello", "World"];

    address payable[] myaddressarray = [payable(0x5B38Da6a701c568545dCfcB03FcB875f56beddC4), 
                                       payable(0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2)];



}