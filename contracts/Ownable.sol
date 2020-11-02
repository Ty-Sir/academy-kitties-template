pragma solidity 0.5.12;

contract Ownable {
  address internal owner;

    modifier onlyOwner(){
    require(msg.sender == owner);
    _; //continue execution of fucntion--called before the function
  }

  constructor() public{  //needs to be public/can only be set once
    owner = msg.sender;
  }
}
