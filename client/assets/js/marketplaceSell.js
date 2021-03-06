let web3 = new Web3(Web3.givenProvider);

let catContractInstance;
let marketPlaceInstance;
let user;
let catContractAddress = "";//enter contract here after migration
let marketPlaceContractAddress = "";//enter contract here after migration

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
    }).on('error', (error, receipt) => console.log(error, receipt));
  })
});

function closeIcon(){
  $('#close-icon').click(function(){
    $('#eventAlert').hide();
  });
};

async function checkIfApprovedOnLoad(){
  try{
    let checkIfApproved = await catContractInstance.methods.isApprovedForAll(user, marketPlaceContractAddress).call();
    console.log(checkIfApproved);

    let ownedCats = await catContractInstance.methods.getMyCats(user).call({from:user});

    if(checkIfApproved == false){
      setApproval();
      $('#removePermissionFromMarketplaceBtn').css('display', 'none');
      console.log('is not approved');

    } else if(checkIfApproved == true && ownedCats.length == 0){
      noCatsOwned();
      $('#removePermissionFromMarketplaceBtn').css('display', 'block');
      console.log('is approved but no cats owned');

    } else{
      getCats();
      $('#removePermissionFromMarketplaceBtn').css('display', 'block');
      console.log('is approved and owns cats');
    }
  } catch(err){
    console.log(err);
  }
};

$('#removePermissionBtn').click(async function(){
  try{
    let catsOnSale = await marketPlaceInstance.methods.getAllTokenOnSale().call({from:user});
    let ownedCats = await catContractInstance.methods.getMyCats(user).call({from:user});

    for(i = 0; i < ownedCats.length; i++){//removes cats for sale so not false advertisements on buying page
      if(catsOnSale.includes(ownedCats[i])){
        await marketPlaceInstance.methods.removeOffer(ownedCats[i]).send({}, (err, txHash) => {
          if(err){
            console.log(err.message);
          }else{
            console.log(txHash, "offer removed");
          }
        });
      }
    };

    await catContractInstance.methods.setApprovalForAll(marketPlaceContractAddress, false).send({}, (err, txHash) => {
      if(err){
        console.log(err.message);
      }else{
        console.log(txHash, "Approval Successfully Removed");
      }
    });

    $('#removePermissionModal').modal('hide');
    $('#successfullyRemovedModal').modal('show');
  } catch(err){
    console.log(err);
  }
});

function setApproval(){
  let setApproved = "<p class='welcomeBox shadow'><span id='welcomeBoxTitle'>Welcome to the Marketplace!</span><br> Please grant the marketplace permission if you'd like to sell your cats!<br> <span class='welcomeBoxSubtext'>(you can always remove permission later on)</span> <br> <button type='button' id='setApprovalBtn'>Click Here To Start</button></p>"
  $('main').append(setApproved);

  $('#setApprovalBtn').click(async function(){
    await catContractInstance.methods.setApprovalForAll(marketPlaceContractAddress, true).send({}, (err, txHash) => {
      if(err){
        console.log(err.message);
      }else{
        console.log(txHash, "Approval Successfully Granted");
      }
    });

    $('#successfullyApprovedModal').modal('show');

    $('#approvedContinue').click(function(){
      window.location.href = 'marketplaceSell.html';
    });
  });
};

async function noCatsOwned(){
  try{
    let gen0Limit = await catContractInstance.methods.gen0CreationLimit().call();
    let gen0Created = await catContractInstance.methods.gen0Counter().call();

    if(gen0Created < gen0Limit){
      let textIfNoCatsAndUnderGen0Limit = "<p class='noCatText shadow'>Uh-oh...you don't own any cats to sell! 🙀 <br> <a href='factory.html'><button type='button' id='makeSomeHereBtn'>Make Some Here!</button></a><br><br><span class='spaceBelowTopBtn'>Or buy some in the marketplace! 🏪</span><br><a href='marketplaceBuy.html'><button type='button' id='continueToMarketplaceBtn'>Continue to Marketplace</button></a></p>"
      $('.textIfNoCats').append(textIfNoCatsAndUnderGen0Limit);
    }else{
      let textIfNoCats = "<p class='noCatText shadow'>Uh-oh...you don't own any cats to sell! 🙀<br><br><span class='spaceBelowTopBtn'>But don't worry you can buy some in the marketplace! 🏪</span><br><br><a href='marketplaceBuy.html'><button type='button' id='continueToMarketplaceBtn'>Continue to Marketplace</button></a></p>"
      $('.textIfNoCats').append(textIfNoCats);
    }
  } catch(err){
    console.log(err);
  }
};

async function getCats(){
  try{
    let ownedCats = await catContractInstance.methods.getMyCats(user).call({from:user});
    console.log(ownedCats);

    for(i = 0; i < ownedCats.length; i++){
      let cat = await catContractInstance.methods.getKitty(ownedCats[i]).call();
      let newTokenID = ownedCats[i];
      addCat(cat[1], cat[5], i, newTokenID);
      console.log(cat);
    }

  } catch(err){
    console.log(err);
  }
};

async function addCat(geneString, gen, id, newTokenID){
  try{
    let catsOnSale = await marketPlaceInstance.methods.getAllTokenOnSale().call({from:user});
    console.log(catsOnSale);

    if(catsOnSale.includes(newTokenID)){
      console.log('active cat(s) found');
      isActive(newTokenID, id);
    }
  } catch(err){
    console.log(err);
  }

  let catsDna = catDna(geneString);
  console.log(catsDna);
  console.log('ID: ' + id);
  console.log('newTokenID: ' + newTokenID);

  catDiv(id);

  $('.gen' + id).html("GEN: " + gen);
  $('.tokenID' + id).html("Token ID: " + newTokenID);

  renderCat(catsDna, id);
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
  let price = $('.offer' + id).val().match(/^0*(\d+(?:\.(?:(?!0+$)\d)+)?)/)[1]; //removes leading and trailing zeros

    if(price < .000001 || price > 300){
      alert("Price cannot exceed 300eth or be below .000001eth");
    } else {
      let priceInWei = web3.utils.toWei(price, "ether");
      await marketPlaceInstance.methods.setOffer(priceInWei, newTokenID).send({}, (err, txHash) => {
        if(err){
          console.log(err.message);
        }else{
          console.log(txHash, "offer set");
        }
      });

      $('.remove-offer-group' + id).css('display', 'block');
      $('#cat-price' + id).html("Offered at: " + price + "ETH")
      $('.offer-group' + id).css('display', 'none');
      $('html, body').animate({scrollTop:0}, 'slow'); //to show alert
    }
  });
};

let validate = function(e){
  let t = e.value;
  e.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 7)) : t;
};

async function isActive(newTokenID, id){
  try{
    let offer = await marketPlaceInstance.methods.getOffer(newTokenID).call();
    console.log(offer.active);
    let price = web3.utils.fromWei(offer.price);

    $('.remove-offer-group' + id).css('display', 'block');
    $('#cat-price' + id).html("Offered at: " + price + "ETH")
    $('.offer-group' + id).css('display', 'none');
  } catch(err){
    console.log(err);
  }
};

function removeCatOffer(newTokenID, id){
  $('#removeOffer' + id).click(async function(){
    await marketPlaceInstance.methods.removeOffer(newTokenID).send({}, (err, txHash) => {
      if(err){
        console.log(err.message);
      }else{
        console.log(txHash, "offer removed");
      }
    });

    $('.remove-offer-group' + id).css('display', 'none');
    $('.offer-group' + id).css('display', 'block');
    $('html, body').animate({scrollTop:0}, 'slow'); //to show alert
    $('.offer' + id).val('');
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
  let catCard =  `<div>
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
                      <input class="offer`+id+` offer-amount" type="number" onKeyPress="if(this.value.length==8) return false;" oninput="validate(this)" max="300" min=".000001" placeholder="Enter ETH" required>
                      <button class="btn btn-primary createOffer" id="createOffer`+id+`">Create Offer</button>
                    </div>

                    <div class="remove-offer-group remove-offer-group`+id+`">
                      <span class="catPrice" id="cat-price`+id+`"></span>
                      <button type="button" class="btn btn-danger removeOffer" id="removeOffer`+id+`">Remove Offer</button>
                    </div>

                  </div>`

  $('.catDivs').prepend(catCard);
};
