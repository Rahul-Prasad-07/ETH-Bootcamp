// SPDX-License-Identifier:MIT

pragma solidity ^0.8.19;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// sepolia deployed contract address with 0.005 ETH :0x5F137f2A47c5053e027C587CddC3767421A8D1f2
contract FundMe{

    uint256 public minimumUsd = 5 * 1e18; // we need to update this in decimal bcz eth price also comes with decimals

    function fund() public payable {

        require(getConvertsionRateofEthinUsd(msg.value) >=  minimumUsd, "didn't send enough ETH" );

    }
    
    // deployed contract address on sepolia : 0x33e4f8Cd526273Af0D08e6BC8c3267EC9fB68f34
    function getPrice() public view returns(uint256){
      
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        (,int256 answer,,,)= priceFeed.latestRoundData(); //price of eth in usd
        return uint256(answer * 1e10); // price in 18 decimal not in whole number 

    }

    function withdraw() public{}

    function getVersion() public view returns (uint256){
       
       return AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306).version();
        
    }

    function getConvertsionRateofEthinUsd(uint256 ethAmount) public view returns(uint256){
        uint256 ethPrice = getPrice();
        uint256 ethAmountInUsd = (ethPrice * ethAmount)/1e18;

        return ethAmountInUsd; // in 18 decimals
    }
}