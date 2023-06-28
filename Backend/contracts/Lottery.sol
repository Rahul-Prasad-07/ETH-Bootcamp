// SPDX-License-Identifier:MIT

pragma solidity ^0.8.15;

contract lottery {

    address public owner;
    address payable [] public players;
    address[] public winners;
    uint public lotteryId;

    // constructor - this will run when contract is deployed 
    // you want to initialzed, owner of the contract and lottryId mst be zero

    constructor (){
        owner = msg.sender;
        lotteryId = 0;
    }
    
    // enter as player in the game
    function enter() public payable {
        require(msg.value >= 0.1 ether);
        players.push(payable(msg.sender));
    } 

    // return players 
    function getPlayers() public view returns ( address payable[] memory){
        return players;
    }

    // Get Balance
    function getBlance() public view returns(uint){
        // solidity works in Wei
        return address(this).balance;
    }

    // Get Lottery ID
    function getLotteryId() public view returns (uint){
        return lotteryId;
    }

    // get random number (helper function for picking winner)
    function getRandomNumber() public view returns (uint) {

        // this technique is not for production, hacker van destroy your add
        // advice to use chainlink random genrator

        return uint(keccak256(abi.encodePacked(owner, block.timestamp)));

        // passing owner of the contract and timestamp : got massive randome number into int
    }

    // picking winner
    function pickWinner() public {

        // only owner needs to pick winner, nobody outsider able to pick winner
        require(msg.sender == owner);
        uint randomIndex = getRandomNumber()% players.length ;
        players[randomIndex].transfer(address(this).balance);

        // garb the winners and push the player who wins
        winners.push(players[randomIndex]);
        lotteryId++;

        // clear the players array
        players = new address payable[](0);

    }

    // Get Winners

    function getWinners() public view returns (address [] memory){
        return winners;
    }

    


}