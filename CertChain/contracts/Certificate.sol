pragma solidity ^0.4.15;

import "./Owned.sol";

contract Certificate {
    address public owner;
    address addressOfAwardee;
    string aadhaarNumberOfAwardee;
    string nameOfAwardee;
    address addressOfUniversity;
    string nameOfUniversity;
    string nameOFTheDegree;
    string grades;

    
    function Certificate(
        address _addressOfAwardee,
        string _aadhaarNumberOfAwardee,
        string _nameOfAwardee,
        address _addressOfUniversity,
        string _nameOfUniversity,
        string _nameOFTheDegree,
        string _grades
        ) public 
        {
        addressOfAwardee = _addressOfAwardee;
        aadhaarNumberOfAwardee = _aadhaarNumberOfAwardee;
        nameOfAwardee = _nameOfAwardee;
        addressOfUniversity = _addressOfUniversity;
        nameOfUniversity = _nameOfUniversity;
        nameOFTheDegree = _nameOFTheDegree;
        grades = _grades;
        owner = _addressOfUniversity;    
    }
    
}
