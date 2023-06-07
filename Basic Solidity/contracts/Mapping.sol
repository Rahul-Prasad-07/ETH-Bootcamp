// SPDX-License-Identifier:MIT

pragma solidity ^0.8.13;

contract Mapping {
    
    // Mapping--> here you can map every value item by key to get value or delate value
    // uniq data types, key value pair
    mapping (uint => string) myMap;

    function getvalue(uint key) public view returns(string memory){
        return myMap[key];
    }

    function deleteValue (uint key) public {
        delete myMap[key];
    }

    

    // struct --> here you can create a structure of data types and you can use it as a data type

    struct Person {
        string name ;
        uint256 age;
        bool hasDrivingLicense;
    }

    Person myPerson = Person("Rahul", 24, false);

}