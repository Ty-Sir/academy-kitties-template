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

      if(message == "Cat Bought"){
        $('#eventAlert').css("display", "block");
        $('#eventAlert').html('<button type="button" class="close" aria-label="Close">' +
                                '<span aria-hidden="true" id="close-icon">&times;</span>' +
                              '</button>' +
                              '<p>' + '<a href="catalouge.html">Successfully purchased cat with ID: ' + tokenID + ', click here to see it!</a>' + '</p>');
      } else if(message == "Offer Removed"){
        $('#eventAlert').css("display", "block");
        $('#eventAlert').html('<button type="button" class="close" aria-label="Close">' +
                                '<span aria-hidden="true" id="close-icon">&times;</span>' +
                              '</button>' +
                              '<p> Successfully removed cat offered with ID: ' + tokenID + ' </p>');
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

  let catsForSale = await marketPlaceInstance.methods.getAllTokenOnSale().call();
  console.log(catsForSale);

  if(checkIfApproved == false){
    setApproval();
    console.log('is not approved');

  } else if(checkIfApproved == true && catsForSale.length === 0){
    noCatsForSale();
    console.log('is approved but no cats have been put for sale yet');

  } else if(checkIfApproved == true && catsForSale.every(cat => cat == 0)){ //checks to see if every entry in array is a zero
    noCatsForSale();
    console.log('is approved but no cats for sale');

  } else{
    loadForSaleCats();
    console.log('is approved and cats for sale loaded');

  }
};

function setApproval(){
  let setApproved = "<p class='welcomeBox shadow'><span id='welcomeBoxTitle'>Welcome to the Marketplace!</span><br> Let's get you approved to sell and buy cats! <br> <button type='button' id='setApprovalBtn'>Click Here To Start</button></p>"
  $('main').append(setApproved);

  $('#setApprovalBtn').click(async function(){
    let approveThisAddress = await catContractInstance.methods.setApprovalForAll(marketPlaceContractAddress, true).send();
    console.log(approveThisAddress);
    window.location.href = 'marketplaceBuy.html';
  });
};

function noCatsForSale(){
  let noneForSaleText = "<p class='noCatsForSaleText shadow'>Looks like no cats are for sale at the moment!<br> Why not be the first! <br><a href='marketplaceSell.html'><button type='button' id='sellMyCats'>Let's put some for sale!</button></a></p>"
  $('.textIfNoCatsForSale').append(noneForSaleText);
};

async function loadForSaleCats(){
  let catsForSale = await marketPlaceInstance.methods.getAllTokenOnSale().call({from:user});

  for(i = 0; i < catsForSale.length; i++){
    if(catsForSale[i] != 0){
      let offer = await marketPlaceInstance.methods.getOffer(catsForSale[i]).call();
      let cat = await catContractInstance.methods.getKitty(offer.tokenID).call();
      let newTokenID = catsForSale[i];

      console.log(offer.tokenID, offer.price);
      addCat(cat[1], cat[5], i, newTokenID, offer.seller, offer.price);
    }
  };
};

function addCat(geneString, gen, id, newTokenID, seller, price){
  let catsDna = catDna(geneString);
  console.log(catsDna);
  console.log('ID: ' + id);
  console.log('newTokenID: ' + newTokenID);
  catDiv(id);

  let newPrice = web3.utils.fromWei(price);
  $('.gen' + id).html("GEN: " + gen);
  $('.tokenID' + id).html("Token ID: " + newTokenID);
  $('#cat-price' + id).html("Price: " + newPrice + "ETH");

  renderCat(catsDna, id);
  buyCat(id, newTokenID);
  checkUserAgainstSeller(id, seller, newTokenID);
  removeCatOffer(newTokenID, id);

  if(geneString.substring(0, 2) > 89 || geneString.substring(2, 4) > 89 || geneString.substring(4, 6) > 89 || geneString.substring(6, 8) > 89 ||
      geneString.substring(10, 12) > 89 || geneString.substring(12, 14) > 89){
    console.log('rare dna');
    $('.rareDNA' + id).css('display', 'block');
  };
};

function buyCat(id, newTokenID){
  $('#buyCat' + id).click(async function(){
    let offer = await marketPlaceInstance.methods.getOffer(newTokenID).call();
    let price = offer.price;
    let seller = offer.seller;
    console.log(price, seller);

    let buy = await marketPlaceInstance.methods.buyKitty(newTokenID).send({value: price});
    console.log(buy);

    $('.buy-group' + id).hide();
    $('#catBox' + id).removeClass('shadow');
    $('#catBox' + id).addClass('bought-shadow');
    $('html, body').animate({scrollTop:0}, 'slow'); //to show alert
  });
};

function checkUserAgainstSeller(id, seller, newTokenID){
  if(seller.toUpperCase() == user.toUpperCase()){
    console.log('same guy');
    $('#buyCat' + id).css('display', 'none');
    $('#removeOffer' + id).css('display', 'inline');
  };
};

function removeCatOffer(newTokenID, id){
  $('#removeOffer' + id).click(async function(){
    let remove = await marketPlaceInstance.methods.removeOffer(newTokenID).send();
    console.log(remove, "offer removed");
    $('#catBox' + id).hide();
    $('.buy-group' + id).hide();
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
                    <div class="col-lg-4 shadow catBox" id="catBox` + id + `">

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

                    <div class="buy-group buy-group` + id + `">
                      <span class="catPrice" id="cat-price` + id + `"></span>
                      <button type="button" class="btn btn-success buyCat" id="buyCat` + id + `">Buy Cat</button>
                      <button type="button" class="btn btn-danger removeOffer" id="removeOffer` + id + `">Remove Offer</button>
                    </div>

                  </div>`

  $('.catDivs').prepend(catCard);
};
