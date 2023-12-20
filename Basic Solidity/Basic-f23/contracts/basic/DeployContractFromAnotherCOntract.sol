// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {SimpleStorage} from "./SimpleStorage.sol";

// this contract is going to deploy SimpleStorage contract
contract SimpleStorageFactory{

    SimpleStorage[] public listOfSimpleStorageContract;

    // create SimpleStorage contract
    function createSimpleStorageContract() public {

        // create new instace of simpleStorage contract via variable simpleStorage
        SimpleStorage newSimpleStorageContract  = new SimpleStorage();
        listOfSimpleStorageContract.push(newSimpleStorageContract);

    }

    // interact with simpleStorage contract func
    function sfStore(uint256 _simpleStorageIndex, uint256 _newSimpleStorageNumber) public {

        SimpleStorage mySimpleStoragge = listOfSimpleStorageContract[_simpleStorageIndex];
        mySimpleStoragge.store(_newSimpleStorageNumber);
    }

    // retreive the new number on perticular contract that you have store
    function sfGet(uint256 _simpleStorageIndex) public view returns(uint256){
        return listOfSimpleStorageContract[_simpleStorageIndex].retrieve();
    }


}