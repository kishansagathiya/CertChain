pragma solidity ^0.4.15;

import "./Certificate.sol";
import "./Owned.sol";

contract University {
    address public owner;
    address public recognizingBody;
    string public name;
    event CertificateAddedLog(
        address _addressOfAwardee,
        string _nameOfAwardee,
        address _addressOfUniversity,
        string _nameOfUniversity,
        string _nameOfTheDegree,
        string _grades,
        address _owner
        );

    function University(address _recognizingBody, address _owner, string _name) public {
        recognizingBody = _recognizingBody;
        owner = _owner;
        name = _name;
    }
    
    function AddCertificate(
        address _addressOfAwardee,
        string _nameOfAwardee,
        address _addressOfUniversity,
        string _nameOfUniversity,
        string _nameOfTheDegree,
        string _grades
        ) public returns(Certificate certificate)
        {
        certificate = new Certificate(
            _addressOfAwardee,
            _nameOfAwardee, 
            _addressOfUniversity, 
            _nameOfUniversity,
            _nameOfTheDegree, 
            _grades, 
            owner);

        CertificateAddedLog(
            _addressOfAwardee,
            _nameOfAwardee, 
            _addressOfUniversity, 
            _nameOfUniversity,
            _nameOfTheDegree, 
            _grades, 
            owner);    
    }
    
}

