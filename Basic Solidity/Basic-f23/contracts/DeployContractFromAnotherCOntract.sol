// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {SimpleStorage} from "./SimpleStorage.sol";

// this contract is going to deploy SimpleStorage contract
contract SimpleStorageFactory{

    SimpleStorage public simpleStorage;

    // create SimpleStorage contract
    function createSimpleStorageContract() public {

        // create new instace of simpleStorage contract via variable simpleStorage
        simpleStorage = new SimpleStorage();

    }

}