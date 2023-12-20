// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import {SimpleStorage} from "./SimpleStorage.sol";

// this contract is going to Inherate SimpleStorage contract
contract AddFiveStorage is SimpleStorage {

    function store(uint256 _newNumber) public override {
        myFavoriteNumber = _newNumber +5;
    }

}