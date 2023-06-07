// SPDX-License-Identifier:MIT

pragma solidity ^0.8.13;

contract control {
    uint myNumber = 5;

    function checknum() public returns (bool) {

        if (myNumber < 5) {
            // do something
            return false;
        } else if (myNumber > 5) {
            // do something
            return false;
        } else {
            // do something
            return true;
        }
    }
}
