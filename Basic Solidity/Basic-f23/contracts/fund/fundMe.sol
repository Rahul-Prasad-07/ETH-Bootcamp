// SPDX-License-Identifier:MIT

pragma solidity ^0.8.19;

contract FundMe{

    uint256 public minimumUsd = 5; // IN USD, for to compare via msg.value you need to convert usd to eth via chainlink/oracle

    function fund() public payable {

        require(msg.value >=  minimumUsd, "didn't send enough ETH" );

    }

    function withdraw() public{}
}