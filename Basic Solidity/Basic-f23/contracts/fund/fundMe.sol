// SPDX-License-Identifier:MIT

pragma solidity ^0.8.19;
 
import {PriceConverter} from "./PriceConverter.sol";

// sepolia deployed contract address : 0x8942f9F9f7066082B37dd895D3b944B9Ae7040E6 --> With withdrawal-onlyOwner
contract FundMe{

    using  PriceConverter for uint256;

    uint256 public minimumUsd = 5 * 1e18; // we need to update this in decimal bcz eth price also comes with decimals
    address[] public funders;
    mapping(address => uint256) public addressToAmountFunded;
    address public owner;

    constructor(){
        owner = msg.sender;
    }

    function fund() public payable {

        require(msg.value.getConvertsionRateofEthinUsd() >=  minimumUsd, "didn't send enough ETH" );  //.getConvertsionRateofEthinUsd(XXXX,YYYY) : here first value xx is passed by msg.value and secound YYY pases in ()
        funders.push(msg.sender); // keep trake of senders
        addressToAmountFunded[msg.sender]  += msg.value; // keep track of senders with value

    }

    function withdraw() public onlyOwner{

        for(uint256 funderIndex=0; funderIndex < funders.length; funderIndex++){
            address funder = funders[funderIndex]; // get and iterate over funders array
            addressToAmountFunded[funder] = 0;  // removed amount from funder 

            // reset array
            funders = new address[](0);
            
            // transfer assets
            (bool callSucess,) = payable(msg.sender).call{value:address(this).balance}("");
            require(callSucess, "call failed");
        }
    } 

    modifier onlyOwner(){
        require(msg.sender == owner, "Sender is not owner!");
        _;
    } 

}