// SPDX-License-Identifier:MIT

pragma solidity ^0.8.13;

contract functions {

    uint256 myNumber =5;

    function addTwoNumber(uint256 _value) public {
        myNumber += _value;
    }

    // read only function and return something
    function getMyNumber() public view returns(uint256){
        return myNumber;
    }
}