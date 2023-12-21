// SPDX-License-Identifier:MIT

pragma solidity ^0.8.19;

import {AggregatorV3Interface} from "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// sepolia deployed contract address with 0.005 ETH :0x5F137f2A47c5053e027C587CddC3767421A8D1f2 --> befor withdrawal
contract FundMe{

    uint256 public minimumUsd = 5 * 1e18; // we need to update this in decimal bcz eth price also comes with decimals
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;

    function fund() public payable {

        require(getConvertsionRateofEthinUsd(msg.value) >=  minimumUsd, "didn't send enough ETH" );
        funders.push(msg.sender); // keep trake of senders
        addressToAmountFunded[msg.sender] = addressToAmountFunded[msg.sender] + msg.value; // keep track of senders with value

    }
    
   
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