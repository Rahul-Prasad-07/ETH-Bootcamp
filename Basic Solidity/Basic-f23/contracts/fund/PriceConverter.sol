// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceConverter{

    function getPrice() internal  view returns(uint256){
      
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        (,int256 answer,,,)= priceFeed.latestRoundData(); //price of eth in usd
        return uint256(answer * 1e10); // price in 18 decimal not in whole number 

    }

    function getVersion() internal view returns (uint256){
       
       return AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306).version();
        
    }

    function getConvertsionRateofEthinUsd(uint256 ethAmount) internal view returns(uint256){
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * ethAmount)/1e18;

        return ethAmountInUsd; // in 18 decimals
    }

}
