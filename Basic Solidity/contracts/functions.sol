// SPDX-License-Identifier:MIT

pragma solidity ^0.8.13;

contract functions {

    address owner = 0x3AB17f39108541E02953BDf243E1C5295b1D1616;

    uint256 myNumber =5;

    function addTwoNumber(uint256 _value) public {
        myNumber += _value;
    }

    // read only function and return something
    function getMyNumber() public onlyOwner view returns(uint256){
        return myNumber;
    }

    modifier onlyOwner(){
        require(msg.sender== owner , "You are not the owner");
        _;
    }
}