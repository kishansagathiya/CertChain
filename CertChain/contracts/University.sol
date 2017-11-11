pragma solidity ^0.4.15;

import "./Certificate.sol";
import "./Owned.sol";

contract University {
    address public owner;
    address public recognizingBody;
    string public name;
    event CertificateAddedLog(
        address _addressOfAwardee,
        string  _aadhaarNumberOfAwardee,
        string _nameOfAwardee,
        address _addressOfUniversity,
        string _nameOfUniversity,
        string _nameOfTheDegree,
        string _grades,
        address _owner
        );

    modifier onlyOwner() {
      require(msg.sender == owner);
      _;
    }

    function University(address _recognizingBody, address _owner, string _name) public {
        recognizingBody = _recognizingBody;
        owner = _owner;
        name = _name;
    }
    
    function addCertificate(
        address _addressOfAwardee,
        string _aadhaarNumberOfAwardee,
        string _nameOfAwardee,
        string _nameOfTheDegree,
        string _grades
        ) public onlyOwner returns(Certificate certificate)
        {
        certificate = new Certificate(
            _addressOfAwardee,
            _aadhaarNumberOfAwardee,
            _nameOfAwardee, 
            msg.sender, 
            name,
            _nameOfTheDegree, 
            _grades);

        CertificateAddedLog(
            _addressOfAwardee,
            _aadhaarNumberOfAwardee,
            _nameOfAwardee, 
            msg.sender, 
            name,
            _nameOfTheDegree, 
            _grades, 
            owner);    
    }
    
}

