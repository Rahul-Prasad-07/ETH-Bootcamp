// SPDX-License-Identifier: MIT


pragma solidity 0.8.19;

contract SimpleStorage{
    uint256 myFavoriteNumber;

    mapping(string => uint256) public nameToFavNumber;


    struct Person{
        uint256 favoriteNumber;
        string name;
    }

    Person[] public listOfPeople;
    
    // store fav number
    function store(uint256 _favoriteNumber) public virtual {
        myFavoriteNumber = _favoriteNumber;    
    }
    
    // retreive fav number
    function retrieve() public view returns (uint256){
        return myFavoriteNumber;
    }

    // add people 
    function addPerson(string memory _name, uint256 _favoriteNumber) public{
        listOfPeople.push(Person(_favoriteNumber,_name)); 
        nameToFavNumber[_name] = _favoriteNumber;
    }
}
