// SPDX-License-Identifier:MIT

pragma solidity ^0.8.19;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

contract FundMe{

    uint256 public minimumUsd = 5; // IN USD, for to compare via msg.value you need to convert usd to eth via chainlink/oracle

    function fund() public payable {

        require(msg.value >=  minimumUsd, "didn't send enough ETH" );

    }
    
    // deployed contract address on sepolia : 0x33e4f8Cd526273Af0D08e6BC8c3267EC9fB68f34
    function getPrice() public view returns(uint256){
        // address : 0x694AA1769357215DE4FAC081bf1f309aDC325306
        // Abi --> imported interface
        /*
        function latestRoundData()external view returns (
           uint80 roundId,
           int256 answer,
           uint256 startedAt,
           uint256 updatedAt,
           uint80 answeredInRound
        );
        */

        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        (,int256 answer,,,)= priceFeed.latestRoundData(); //price of eth in usd
        return uint256(answer * 1e10); // price in 18 decimal not in whole number 


    }

    function withdraw() public{}

    function getVersion() public view returns (uint256){
       
       return AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306).version();
        
    }
}