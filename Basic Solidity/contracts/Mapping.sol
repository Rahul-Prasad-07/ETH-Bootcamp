// SPDX-License-Identifier:MIT

pragma solidity ^0.8.13;

contract Mapping {
    
    // uniq data types, key value pair
    mapping (uint => string) myMap;

    function getvalue(uint key) public view returns(string memory){
        return myMap[key];
    }

    function deleteValue (uint key) public {
        delete myMap[key];
    }

    // here you can map every value item by key to get value or delate value
}