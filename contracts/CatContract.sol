pragma solidity ^0.5.12;

import "./IERC721.sol";

contract CatContract is IERC721 {

  string private _name = "CatCoin";
  string private _symbol = "CC";

  Cat[] cats;

  mapping (address => uint256) ownership;
  mapping (uint256 => address) public ownerID;

  function balanceOf(address owner) external view returns (uint256 balance){
    return ownership[owner];
  }

  function totalSupply() external view returns (uint256 total){
    return cats.length;
  }

  function name() external view returns (string memory tokenName){
    return _name;
  }

  function symbol() external view returns (string memory tokenSymbol){
    return _symbol;
  }

  function ownerOf(uint256 tokenId) external view returns (address owner){
    return ownerID[tokenId];
  }

  function transfer(address to, uint256 tokenId) external{
    require(to != address(0),"Cannot Send to Zero Address.");
    require(to != address(this), "You Cannot Send to the Contract Address.");
    require(ownerID[tokenId] == msg.sender, "You Must Be The Owner.");

    ownership[msg.sender] --;
    ownership[to] ++;
    ownerID[tokenId] = to;
    
    emit Transfer(msg.sender, to, tokenId);
  }
}
