pragma solidity ^0.5.12;

import "./CatContract.sol";
import "./Ownable.sol";
import "./IKittyMarketPlace.sol";


contract KittyMarketPlace is Ownable, IKittyMarketPlace {
  CatContract private _CatContract;

  struct Offer{
    address payable seller;
    uint256 price;
    uint256 index;
    uint256 tokenID;
    bool active;
  }

  Offer[] offers;

  mapping(uint256 => Offer) tokenIDToOffer;

  function setKittyContract(address _CatContractAddress) public onlyOwner{
    _CatContract = CatContract(_CatContractAddress);
  }

  constructor(address _CatContractAddress) public {
    setKittyContract(_CatContractAddress);
  }

  function getOffer(uint256 _tokenID) public view returns (address seller, uint256 price, uint256 index, uint256 tokenID, bool active){
    require(tokenIDToOffer[_tokenID].active == true, "This cat is not for sale");
    Offer storage offer = tokenIDToOffer[_tokenID];

    return (offer.seller, offer.price, offer.index, offer.tokenID, offer.active);
  }

  function getAllTokenOnSale() public view returns(uint256[] memory listOfOffers){
    if(offers.length == 0){
        return new uint256[](0);
    } else{
    uint256[] memory forSaleCats = new uint256[](offers.length);

    for(uint256 i = 0; i < offers.length; i++){
      if(offers[i].active == true){
        forSaleCats[i] = offers[i].tokenID;
      }
    }
    return forSaleCats;
    }
  }

  function setOffer(uint256 _price, uint256 _tokenID) public{
    require(_CatContract._owns(msg.sender, _tokenID) == true, "You must own the cat");
    require(tokenIDToOffer[_tokenID].active == false, "Cannot double sell the cat");
    require(_CatContract.isApprovedForAll(msg.sender, address(this)), "Contract must be approved operator for offer to be created");
    require(_price > 0, "No free cats here buddy");

    Offer memory offer = Offer(msg.sender, _price, offers.length, _tokenID, true);

    tokenIDToOffer[_tokenID] = offer;

    offers.push(offer);

    emit MarketTransaction("Offer Created", msg.sender, _tokenID);
  }


  function removeOffer(uint256 _tokenID) public{
    require(tokenIDToOffer[_tokenID].seller == msg.sender, "Must be the seller/owner to remove an offer");

    offers[tokenIDToOffer[_tokenID].index].active = false;
    delete tokenIDToOffer[_tokenID];

    emit MarketTransaction("Offer Removed", msg.sender, _tokenID);
  }


  function buyKitty(uint256 _tokenID) public payable{
    require(tokenIDToOffer[_tokenID].price == msg.value, "Payment must be equal to price of cat");
    require(tokenIDToOffer[_tokenID].active == true, "Offer must be active");

    Offer memory offer = tokenIDToOffer[_tokenID];

    offers[tokenIDToOffer[_tokenID].index].active = false;
    delete tokenIDToOffer[_tokenID];

    offer.seller.transfer(offer.price);

    _CatContract.transferFrom(offer.seller, msg.sender, _tokenID);

    emit MarketTransaction("Cat Bought", msg.sender, _tokenID);
  }
}
