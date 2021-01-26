let web3 = new Web3(Web3.givenProvider);

let catContractInstance;
let marketPlaceInstance;
let user;
let catContractAddress = "0x895104a81B87cBBAf6466076A67fe41a02e5cC9e";
let marketPlaceContractAddress = "0x00497874cF16Eb7Bf49Da8B9a5297551A1Aa4079";//enter the catcontract address after you migrate
let newTokenID;

$(document).ready(function(){
  window.ethereum.enable().then(function(accounts){
    catContractInstance = new web3.eth.Contract(abi.CatContract, catContractAddress, {from: accounts[0]});
    marketPlaceInstance = new web3.eth.Contract(abi.KittyMarketPlace, marketPlaceContractAddress, {from: accounts[0]});
    user = accounts[0];
    checkIfApprovedOnLoad();

    marketPlaceInstance.events.MarketTransaction().on('data', function(event){
      console.log(event);
      let message = event.returnValues.TxType;
      let tokenID = event.returnValues.tokenID;

      if(message == "Offer Created"){
        $('#eventAlert').css("display", "block");
        $('#eventAlert').html('<button type="button" class="close" aria-label="Close">' +
                                '<span aria-hidden="true" id="close-icon">&times;</span>' +
                              '</button>' +
                              '<p> Successfully offered cat with ID: ' + tokenID + ' </p>');
      } else if(message == "Offer Removed"){
        $('#eventAlert').css("display", "block");
        $('#eventAlert').html('<button type="button" class="close" aria-label="Close">' +
                                '<span aria-hidden="true" id="close-icon">&times;</span>' +
                              '</button>' +
                              '<p> Successfully removed cat offered with ID: '+tokenID+' </p>');
      }
      closeIcon();
    }).on('error', console.error);
  })
});

function closeIcon(){
  $('#close-icon').click(function(){
    $('#eventAlert').hide();
  });
};

async function checkIfApprovedOnLoad(){
  let checkIfApproved = await catContractInstance.methods.isApprovedForAll(user, marketPlaceContractAddress).call();
  console.log(checkIfApproved);

  let ownedCats = await catContractInstance.methods.getMyCats(user).call({from:user});

  if(checkIfApproved == false){
    setApproval();
    console.log('is not approved');

  } else if(checkIfApproved == true && ownedCats.length == 0){
    noCatsOwned();
    console.log('is approved but no cats owned');

  } else{
    getCats();
    console.log('is approved and owns cats');
  }
};

function setApproval(){
  let setApproved = "<p class='welcomeBox shadow'><span id='welcomeBoxTitle'>Welcome to the Marketplace!</span><br> Let's get you approved to sell your cats! <br> <button type='button' id='setApprovalBtn'>Click Here To Start</button></p>"
  $('main').append(setApproved);

  $('#setApprovalBtn').click(async function(){
    let approveThisAddress = await catContractInstance.methods.setApprovalForAll(marketPlaceContractAddress, true).send();
    console.log(approveThisAddress);
    window.location.href = 'marketplaceSell.html';
  });
};

function noCatsOwned(){
  let textIfNoCats = "<p class='noCatText shadow'>Uh-oh...you don't own any cats to sell! 🙀 <br> <a href='factory.html'><button type='button' id='makeSomeHereBtn'>Make Some Here!</button></a><br><br><span class='spaceBelowTopBtn'>Or buy some in the marketplace! 🏪</span><br><a href='marketplaceBuy.html'><button type='button' id='continueToMarketplaceBtn'>Continue to Marketplace</button></a></p>"
  $('.textIfNoCats').append(textIfNoCats);
};

async function getCats(){
  let ownedCats = await catContractInstance.methods.getMyCats(user).call({from:user});
  console.log(ownedCats);

  for(i = 0; i < ownedCats.length; i++){
    let cat = await catContractInstance.methods.getKitty(ownedCats[i]).call();
    let newTokenID = ownedCats[i];
    addCat(cat[1], cat[5], i, newTokenID);
    console.log(cat);
  };
};

function addCat(geneString, gen, id, newTokenID){
  let catsDna = catDna(geneString);
  console.log(catsDna);
  console.log('ID: ' + id);
  console.log('newTokenID: ' + newTokenID);

  catDiv(id);

  $('.gen' + id).html("GEN: " + gen);
  $('.tokenID' + id).html("Token ID: " + newTokenID);

  renderCat(catsDna, id);
  isActive(newTokenID, id);
  setOffer(newTokenID, id);
  removeCatOffer(newTokenID, id);

  if(geneString.substring(0, 2) > 89 || geneString.substring(2, 4) > 89 || geneString.substring(4, 6) > 89 || geneString.substring(6, 8) > 89 ||
      geneString.substring(10, 12) > 89 || geneString.substring(12, 14) > 89){
    console.log('rare dna here');
    $('.rareDNA' + id).css('display', 'block');
  };
};

function setOffer(newTokenID, id){
  $('#createOffer' + id).click(async function(){
    let price = $('.offer' + id).val();
    console.log(price);

    let priceInWei = web3.utils.toWei(price, "ether");
    let setOffer = await marketPlaceInstance.methods.setOffer(priceInWei, newTokenID).send();
    console.log(setOffer, 'offer set');
      // window.location.href = "marketplace.html";
    $('.remove-offer-group' + id).css('display', 'block');
    $('#cat-price' + id).html("Offered at: " + price + "ETH")
    $('.offer-group' + id).css('display', 'none');
    $('html, body').animate({scrollTop:0}, 'slow'); //to show alert
  });
};

async function isActive(newTokenID, id){
  let offer = await marketPlaceInstance.methods.getOffer(newTokenID).call();
  console.log(offer.active);
  let price = web3.utils.fromWei(offer.price);

  if(offer.active == true){
    $('.remove-offer-group' + id).css('display', 'block');
    $('#cat-price' + id).html("Offered at: " + price + "ETH")
    $('.offer-group' + id).css('display', 'none');
  };
};

function removeCatOffer(newTokenID, id){
  $('#removeOffer' + id).click(async function(){
    let remove = await marketPlaceInstance.methods.removeOffer(newTokenID).send();
    console.log(remove, "offer removed");
    $('.remove-offer-group' + id).css('display', 'none');
    $('.offer-group' + id).css('display', 'block');
    $('html, body').animate({scrollTop:0}, 'slow'); //to show alert
  });
};


//genes split up for functions to read
function catDna(geneString){
  let genes = {
      headColor: geneString.substring(0, 2),
      mouthColor: geneString.substring(2, 4),
      eyesColor: geneString.substring(4, 6),
      earsColor: geneString.substring(6, 8),
      //Cattributes
      eyesShape: geneString.substring(8, 9),
      decorationPattern: geneString.substring(9, 10),
      decorationMidColor: geneString.substring(10, 12),
      decorationSidesColor: geneString.substring(12, 14),
      animation: geneString.substring(14, 15),
      backgrounds: geneString.substring(15, 16)
  };
  return genes;
};

//html for dynamically displayed cats
async function catDiv(id){
  let catCard =  `<div class="cat-wrapper">
                    <div class="col-lg-4 shadow catBox" id="catBox`+id+`">

                      <div class="cat cat` + id + `">

                        <div class="ears">
                          <div class="ear ear` + id + ` left_ear left_ear` + id + `">
                            <div class="inner_ear left_inner_ear"></div>
                          </div>
                          <div class="ear ear` + id + ` right_ear right_ear` + id + `">
                            <div class="inner_ear right_inner_ear"></div>
                          </div>
                        </div>

                        <div class="head head` + id + `">
                          <div class="head_marking head_marking` + id + `"></div>

                          <div class="eyelashes-left"></div>
                          <div class="eyelashes-right"></div>

                          <div class="eyes">
                            <div class="eye eye` + id + ` left_eye">
                              <div class="animationEye animationEye` + id + `" style="animation-delay: 0s"></div>
                              <div class="animationEye animationEye` + id + `" style="animation-delay: 1s"></div>
                              <div class="animationEye animationEye` + id + `" style="animation-delay: 2s"></div>
                              <div class="animationEye animationEye` + id + `" style="animation-delay: 3s"></div>
                              <div class="iris_left iris_left` + id + ` iris iris` + id + `">
                                <div class="pupils pupils` + id + ` pupil_left"></div>
                                <div class="pupil_highlight pupil_highlight` + id + ` highlight_left"></div>
                              </div>
                            </div>

                            <div class="eye eye` + id + ` right_eye">
                              <div class="animationEye animationEye` + id + `" style="animation-delay: 0s"></div>
                              <div class="animationEye animationEye` + id + `" style="animation-delay: 1s"></div>
                              <div class="animationEye animationEye` + id + `" style="animation-delay: 2s"></div>
                              <div class="animationEye animationEye` + id + `" style="animation-delay: 3s"></div>
                              <div class="iris_right iris_right` + id + ` iris iris` + id + `">
                                <div class="pupils pupils` + id + ` pupil_right"></div>
                                <div class="pupil_highlight pupil_highlight` + id + ` highlight_right"></div>
                              </div>
                            </div>
                          </div>

                          <div class="muzzle_left"></div>
                          <div class="muzzle_right"></div>

                          <div class="cat__whiskers-left"></div>
                          <div class="cat__whiskers-right"></div>

                          <div class="facemark_left facemark_left` + id + `"></div>
                          <div class="facemark_right facemark_right` + id + `"></div>

                          <div class="nose">
                            <div class="nose_point"></div>
                          </div>

                          <div class="mouth mouth` + id + `"></div>

                          <div class="chin_hair chin_hair`+ id +` chin_hair_left chin_hair_left` + id + `"></div>
                          <div class="chin_hair chin_hair`+ id +` chin_hair_middle chin_hair_middle` + id + `"></div>
                          <div class="chin_hair chin_hair`+ id +` chin_hair_right chin_hair_right` + id + `"></div>
                        </div>

                        <div class="body body` + id + `">

                          <div class="sidemark_left sidemark_left` + id + `">
                            <div class="sidemark_left_dot sidemark_left_dot` + id + `"></div>
                          </div>
                          <div class="sidemark_right sidemark_right` + id + `">
                            <div class="sidemark_right_dot sidemark_right_dot` + id + `"></div>
                          </div>

                          <div class="belly belly` + id + `"></div>

                          <div class="legs legs` + id + `">
                            <div class="front_leg front_leg` + id + `">
                              <div class="front_paw front_paw` + id + `"></div>
                            </div>
                            <div class="front_leg front_leg` + id + `">
                              <div class="front_paw front_paw` + id + `"></div>
                            </div>

                            <div class="back_legs">
                              <div class="back_leg back_leg` + id + `">
                                <div class="back_paw back_paw` + id + `"></div>
                              </div>
                              <div class="back_leg back_leg` + id + `">
                                <div class="back_paw back_paw` + id + `"></div>
                              </div>
                            </div>
                          </div>

                        </div>

                        <div class="tail tail` + id + `"></div>

                        <div class="cat-background cat-background` + id + `"></div>

                        <div class="rareDNA rareDNA`+id+`">Rare DNA</div>

                      </div>
                      <div class='gen` + id + ` gen info-font-size'></div>
                      <div class='tokenID` + id + ` tokenID info-font-size'></div>
                    </div>

                    <div class="offer-group offer-group`+id+`">
                      <input class="offer`+id+` offer-amount" type="number" placeholder="Enter ETH">
                      <button type="button" class="btn btn-primary createOffer" id="createOffer`+id+`">Create Offer</button>
                    </div>

                    <div class="remove-offer-group remove-offer-group`+id+`">
                      <span class="catPrice" id="cat-price`+id+`"></span>
                      <button type="button" class="btn btn-danger removeOffer" id="removeOffer`+id+`">Remove Offer</button>
                    </div>

                  </div>`

  $('.catDivs').prepend(catCard);
};
