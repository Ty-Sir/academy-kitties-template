pragma solidity ^0.5.12;

interface IERC721Receiver{
  function onERC721Received(address operator, address from, uint tokenID, bytes calldata data) external returns (bytes4);
}
