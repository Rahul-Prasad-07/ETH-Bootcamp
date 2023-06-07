// SPDX-License-Identifier:MIT

pragma solidity ^0.8.13;

contract loop {

    uint256[] public numbers;

    // constructor to set the value 
    constructor(uint256[] memory _numbers){
        numbers = _numbers;
    }

    function sumWithForLoop() public view returns (uint256){
        uint256 sum =0;

        for(uint256 i=0; i<numbers.length; i++){
            sum += numbers[i];
        }

        return sum;
    }

    // you need to pass that numbers while deploying the contract


    function sumWithWhileLoop() public view returns (uint256){
        uint256 sum =0;
        uint256 i=0;

        while( i<numbers.length){

            sum += numbers[i];
            i++;
        }

        return sum;
    }


}
