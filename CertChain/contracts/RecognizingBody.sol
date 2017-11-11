pragma solidity ^0.4.15;

import "./University.sol";
import "./Owned.sol";

contract RecognizingBody {
    address[] public listOfRecognizingBodies;
    event UniversityAddedLog(
        address recognizingBody,
        address addressOfUniversity,
        string name
        );

    modifier onlyRecognizingBody(){
        bool found;
        for (uint i = 0; i < listOfRecognizingBodies.length; ++i) {
            if(listOfRecognizingBodies[i] == msg.sender){
                found = true;
                break;
            }
        }
        require(found);
        _;
    }

    function RecognizingBody() public {
        listOfRecognizingBodies.push(msg.sender);
    }
    
    function AddRecognizingBody(address newRecognizingBody) public onlyRecognizingBody {
        listOfRecognizingBodies.push(newRecognizingBody);
    }
    
    function AddUniversity(
        address addressOfUniversity,
        string name
        ) public onlyRecognizingBody returns(University university)
        {
            university = new University(msg.sender, addressOfUniversity, name);
            UniversityAddedLog(msg.sender, addressOfUniversity, name);
    }
}