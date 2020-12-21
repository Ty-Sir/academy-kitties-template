pragma solidity ^0.5.12;

import "./Ownable.sol";
import "./IERC721.sol";
import  "./IERC721Receiver.sol";

contract CatContract is  IERC721, Ownable {

  uint256 public constant gen0CreationLimit = 10;
  string private constant _name = "CatCoin";
  string private constant _symbol = "CC";

  bytes4 internal constant MAGIC_ERC721_RECEIVED = bytes4(keccak256("onERC721Received(address,address,uint256,bytes)"));

  bytes4 private constant _INTERFACE_ID_721 = 0x80ac58cd;

  bytes4 private constant _INTERFACE_ID_165 = 0x01ffc9a7;

  event Birth(address owner, uint256 tokenID, uint256 momID, uint256 dadID, uint256 genes);

  struct Cat{
    uint256 genes;
    uint64 birthTime;
    uint32 momID;
    uint32 dadID;
    uint16 generation;
  }

  Cat[] cats;

  mapping (uint256 => address) private ownerID;
  mapping (address => uint256) private ownership;

  mapping (uint256 => address) public kittyIndexToApproved;
  mapping (address => mapping (address => bool)) private _operatorApprovals;

  uint256 public gen0Counter;

  function createGen0Cat(uint256 _genes) public onlyOwner returns(uint256){
    require(gen0Counter < gen0CreationLimit);

    gen0Counter++;

    return  _createKitty(0, 0, 0, _genes, msg.sender);
  }

  function _createKitty(uint256 _momID, uint256 _dadID, uint256 _generation, uint256 _genes, address owner) private returns (uint256){
    Cat memory cat = Cat(
        _genes,
        uint64(now),
        uint32(_momID),
        uint32(_dadID),
        uint16(_generation));

    uint256 newTokenID = cats.length;
    cats.push(cat);

    emit Birth(owner, newTokenID, _momID, _dadID, _genes);

    _transfer(address(0), owner, newTokenID);

    return newTokenID;
  }

  function getKitty(uint256 _tokenID) public view returns(address owner, uint256 genes, uint256 birthTime, uint256 momID, uint256 dadID, uint256 generation){
    require(_tokenID < cats.length, "That cat doesn't exist...yet");
    Cat storage cat = cats[_tokenID];

    return (ownerID[_tokenID], cat.genes, cat.birthTime, cat.momID, cat.dadID, cat.generation);
  }

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

  function ownerOf(uint256 _tokenID) external view returns (address owner){
    require(_tokenID < cats.length, "That cat doesn't exist...yet");
    return ownerID[_tokenID];
  }

  function transfer(address _to, uint256 _tokenID) external{
    require(_to != address(0),"Cannot Send to Zero Address.");
    require(_to != address(this), "You Cannot Send to the Contract Address.");
    require(_owns(msg.sender, _tokenID), "You Must Be The Owner.");

    _transfer(msg.sender, _to, _tokenID);
  }

  function _transfer(address _from, address _to, uint256 _tokenID) private{
    ownership[_to] ++;
    ownerID[_tokenID] = _to;

    if (_from != address(0)){
      ownership[_from] --;
      delete kittyIndexToApproved[_tokenID];
    }

    emit Transfer(_from, _to, _tokenID);
  }

  function _owns(address _claimant, uint256 _tokenID) internal view returns(bool){
    return ownerID[_tokenID] == _claimant;
  }

  function getMyCats() external view returns(uint256[] memory){
    uint256[] memory ownedCats = new uint256[](ownership[msg.sender]);
    for (uint256 i = 0; i < cats.length; i++){
        if (ownerID[i] == msg.sender){
          ownedCats[i] = i;
        }
      }
    return ownedCats;
  }

  function approve(address _approved, uint256 _tokenID) external{
    require(_owns(msg.sender, _tokenID), "Must be owner or operator.");

    kittyIndexToApproved[_tokenID] = _approved;

    emit Approval(msg.sender, _approved, _tokenID);
  }

  function setApprovalForAll(address _operator, bool _approved) external{
    require(_operator != msg.sender, "The owner can't be the operator");

    _operatorApprovals[msg.sender][_operator] = _approved;

    emit ApprovalForAll(msg.sender, _operator, _approved);
  }

  function getApproved(uint256 _tokenID) external view returns (address){
    require(_tokenID < cats.length, "That token/cat doesn't exist.");
    return kittyIndexToApproved[_tokenID];
  }

  function isApprovedForAll(address _owner, address _operator) external view returns (bool){
    return _operatorApprovals[_owner][_operator];
  }

  function transferFrom(address _from, address _to, uint256 _tokenID) external{
    require(msg.sender == _from || _operatorApprovals[_from][msg.sender] || kittyIndexToApproved[_tokenID] == msg.sender, "msg.sender must be current owner, an authorized operator, or the approved address of token");
    require(ownerID[_tokenID] == _from, "_from must be current owner");
    require(_to != address(0), "Cannot send to zero address");
    require(_tokenID < cats.length, "That token doesn't exist.");

    _transfer(_from, _to, _tokenID);
  }

  function safeTransferFrom(address _from, address _to, uint256 _tokenID, bytes memory _data) public{
    require(msg.sender == _from || _operatorApprovals[_from][msg.sender] || kittyIndexToApproved[_tokenID] == msg.sender, "msg.sender must be current owner, an authorized operator, or the approved address of token");
    require(ownerID[_tokenID] == _from, "_from must be current owner");
    require(_to != address(0), "Cannot send to zero address");
    require(_tokenID < cats.length, "That token doesn't exist.");

    _safeTransfer(_from, _to, _tokenID, _data);
  }

  function safeTransferFrom(address _from, address _to, uint256 _tokenID) external{
    safeTransferFrom(_from, _to, _tokenID, "");
  }

  function _safeTransfer(address _from, address _to, uint256 _tokenID, bytes memory _data) internal{
    _transfer(_from, _to, _tokenID);
    require(_checkERC721Support(_from, _to, _tokenID, _data));
  }

  function _checkERC721Support(address _from, address _to, uint256 _tokenID, bytes memory _data) internal returns(bool){
    if(!_isContract(_to)){
      return true;
    }

    bytes4 returnData = IERC721Receiver(_to).onERC721Received(msg.sender, _from, _tokenID, _data);
    return returnData == MAGIC_ERC721_RECEIVED;
  }

  function _isContract(address _to) view internal returns (bool){
    uint32 size;
    assembly{
        size := extcodesize(_to)
    }
    return size > 0;
  }

  function supportsInterface(bytes4 _interfaceID) external pure returns (bool){
    return (_interfaceID == _INTERFACE_ID_721 || _interfaceID == _INTERFACE_ID_165);
  }

  function breed(uint256 _dadID, uint256 _momID) public returns (uint256){
    require(_owns(msg.sender, _dadID) && _owns(msg.sender, _momID), "You must own both cats to breed.");

    //had to look ahead for these two lines and the gen algo
    //could not find anything online to help
    (,uint256 _dadDna,,,,uint256 dadGen) = getKitty(_dadID);
    (,uint256 _momDna,,,,uint256 momGen) = getKitty(_momID);

    uint256 newDna = _mixDna(_dadDna, _momDna);

    uint256 babyGen = 0;

    if (dadGen < momGen){
       babyGen = momGen + 1;
       babyGen /= 2;
    } else if (dadGen > momGen){
        babyGen = dadGen + 1;
        babyGen /= 2;
    } else {
        babyGen = dadGen + 1;
    }

    _createKitty(_momID, _dadID, babyGen, newDna, msg.sender);
  }

  function _mixDna(uint256 _dadDna, uint256 _momDna) internal view returns (uint256){
    uint256[8] memory geneArray;

    uint8 random = uint8(now % 255); //num: 0-255, binary:00000000-11111111
    uint256 i = 1;
    uint256 index = 7;

    for(i = 1; i <= 128; i=i*2){
      if(index == 1){
        geneArray[1] = uint8(now * 89) + 10;
      } else if(index == 3){
        geneArray[3] = uint8(now * 89) + 10;
      } else if(index == 6){
          geneArray[6] = uint8(now * 7) + 1;
      } else if(random & i != 0){
        geneArray[index] = uint8(_momDna % 100);
      } else{
        geneArray[index] = uint8(_dadDna % 100);
      }
      _momDna = _momDna / 100;
      _dadDna = _dadDna / 100;

      index = index - 1;
    }

    uint256 newGene;

    for(i = 0; i < 8; i++){
      newGene = newGene + geneArray[i];
      if(i != 7){
        newGene = newGene * 100;
      }
    }
    return newGene;
  }
}
