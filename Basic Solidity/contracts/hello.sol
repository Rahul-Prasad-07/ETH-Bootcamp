// SPDX-License-Identifier: MIT

pragma solidity ^0.8.13;

// contract
// state variables : to store the data of the contract
// constructor : to initialize the contract and thier variables
// function : to define the functions of the contract
  
  // 1.  public : can be accessed by anyone
  // 2.  private : can be accessed only by the contract
    
    // view : can be accessed only by the contract and it will not modify the state of the contract
    // pure : can be accessed only by the contract and it will not modify the state of the contract and it will not read the state of the contract
    // payable : can be accessed only by the contract and it will not modify the state of the contract and it will not read the state of the contract and it will accept the ether




contract HelloWorld {

    string greeting;

    constructor (){
        greeting = "Hello Rahul, How are you?";
    }

    function hello () public view  returns (string memory){

       return greeting;
      
    }
}