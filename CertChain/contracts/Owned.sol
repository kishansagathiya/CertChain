pragma solidity ^0.4.13;

contract Owned {
    address public owner;
    event LogOwnerSet(address prev, address newOwner);
    
    modifier onlyOwner() {
      require(msg.sender == owner);
      _;
    }

    function Owned() {
      owner = msg.sender;
    }

    /**
     * Sets the new owner for this contract.
     *   - only the current owner can call this function
     *   - only a new address can be accepted
     *   - only a non-0 address can be accepted
     * @param newOwner The new owner of the contract
     * @return Whether the action was successful.
     * Emits LogOwnerSet.
     */
    function setOwner(address newOwner) onlyOwner returns(bool success) {
      require(newOwner != 0);
      require(newOwner != owner);
      address prev = owner;
      owner = newOwner;
      LogOwnerSet(prev, newOwner);
      return true;
    }

    /**
     * @return The owner of this contract.
     */
    function getOwner() constant returns(address) {
      return owner;
    }
}