let web3 = new Web3(Web3.givenProvider);

let catContractInstance;
let user;
let catContractAddress = "";//enter contract here after migration
let newTokenID;

$(document).ready(function(){
  window.ethereum.enable().then(function(accounts){
    catContractInstance = new web3.eth.Contract(abi.CatContract, catContractAddress, {from: accounts[0]});
    user = accounts[0];
    getCats();

    //emits birth event
    catContractInstance.events.Birth().on('data', function(event){
      console.log(event);
      let owner = event.returnValues.owner;
      let tokenID = event.returnValues.tokenID;
      let genes = event.returnValues.genes;
      $('#eventAlert').css("display", "block");
      $('#eventAlert').html('<button type="button" class="close" aria-label="Close">' +
                            '<span aria-hidden="true" id="close-icon">&times;</span>' +
                            '</button>' +
                            '<big>' + '<a href="catalouge.html">Click here to see your cat!</a>' + '</big>' +
                            '<br>' + '<br>' +
                            '<big>' + "Owner: " + '</big>' + owner +
                            '<big>' + " Kitten ID: " + '</big>' + tokenID +
                            '<big>' + " Genes: " + '</big>' + genes);
      closeIcon();
    }).on('error', (error, receipt) => console.log(error, receipt));
  });
});

//close-icon button for birth alert
function closeIcon(){
  $('#close-icon').click(function(){
    $('#eventAlert').hide();
  });
};

//needs to be async otherwise ownedCats will be one behind
async function getCats(){
  try{
    let ownedCats = await catContractInstance.methods.getMyCats(user).call({from:user});
    console.log(ownedCats);

    //message when less than 2 cats are owned
    if(ownedCats.length < 2){
      let textIfLessThanTwoCats = "<p class='noCatText shadow'>Uh-oh...🙀 <br> You need at least <b>two</b> cats to make a kitten! <br> <a href='factory.html'><button type='button' id='makeSomeHereBtn'>Make Some Here!</button></a></p>"
      $('main').append(textIfLessThanTwoCats);
      $('.cats-container').css('display', 'none');
      $('#breedBtn').css('display', 'none');
    };

    for(i = 0; i < ownedCats.length; i++){
      let cat = await catContractInstance.methods.getKitty(ownedCats[i]).call();
      let newTokenID = ownedCats[i];
      chooseCats(i, newTokenID);
      addCat(cat[1], cat[5], i, newTokenID);
      console.log(cat);
    };
  } catch(err){
    console.log(err);
  }
};

//saving 1st modal html before opening
let firstModalHtml = '';

$('#choose-first-cat').click(function(){
  //resaving html
  firstModalHtml = $('#catsModal1').html();
  $('#catsModal1').modal('show');
});

$('#catsModal1').on('hidden.bs.modal', function(){
  //when modal closed--adding old html to allow for choosing a different cat without getting the most recent chosen one deleted
  $('#catsModal1').html(firstModalHtml);
  $('#catsModal2').modal('hide');
});

//manually closes 1st modal when cat is chosen
$('#catsModal1').click(function(){
  $('#catsModal1').modal('hide');
});

function helperForFirstModal(id){
  //if both cats have the same ID -- user must choose a new one
  //message displayed in div where needs to be corrected
  if($('#firstCatId').text() === $('#secondCatId').text()){
    $('#choose-first-cat').html('The cats must be different,<br>choose again. 😺');
    $('#choose-second-cat').removeClass('choose-cat');
    $('#choose-second-cat').addClass('choose-first-cat-first');
    $('#choose-second-cat').html("Choose Second Cat");
  };
};

function chooseFirstCat(id, newTokenID){
  //when 1st modal is opened
  $('#catsModal1').on('shown.bs.modal', function(){
    $('#firstCatDivs #catBox' + id).click(function(){
      $('#choose-second-cat').removeClass('choose-first-cat-first');
      $('#choose-second-cat').addClass('choose-cat');

      console.log("first id: " + newTokenID);
      $('#choose-first-cat').html($('#catBox' + id));

      $('#firstCatId').text(newTokenID);
      console.log('span 1: ' + $('#firstCatId').text());

      $('#catBox' + id).css('margin-right', '140px');
      $('#choose-first-cat').css('border', '2px solid #528bff');

      helperForFirstModal(id);
    });
  });
};

//saving 2nd modal html before opening-like in first(above)
let secondModalHtml = '';

$('#choose-second-cat').click(function(){
  //resaving html - and manually opens second modal
  secondModalHtml = $('#catsModal2').html();
  $('#catsModal2').modal('show');
});

$('#catsModal2').on('hidden.bs.modal', function(){
  //when modal closed--adding old html to allow for choosing a different cat without getting the most recent chosen one deleted
  $('#catsModal1').html(firstModalHtml);
  $('#catsModal2').html(secondModalHtml);
});

//manually closes 2nd modal when cat is chosen
$('#catsModal2').click(function(){
  $('#catsModal2').modal('hide');
});

function helperForSecondModal(id){
  //if both cats have the same ID -- user must choose a new one
  //message displayed in div where needs to be corrected
  if($('#secondCatId').text() === $('#firstCatId').text()){
    $('#choose-first-cat').html('The cats must be different,<br>choose again. 😺');
    $('#choose-second-cat').removeClass('choose-cat');
    $('#choose-second-cat').addClass('choose-first-cat-first');
    $('#choose-second-cat').html("Choose Second Cat");
  };
};

function chooseSecondCat(id, newTokenID){
  //when 2nd modal is opened
  $('#catsModal2').on('shown.bs.modal', function(){
    $('#secondCatDivs #catBox' + id).click(function(){
      console.log("second id: " + newTokenID);
      $('#choose-second-cat').html($('#catBox' + id));

      $('#secondCatId').text(newTokenID);
      console.log('span 2: ' + $('#secondCatId').text());

      $('#catBox' + id).css('margin-right', '140px');
      $('#choose-second-cat').css('border', '2px solid #528bff');

      helperForSecondModal(id);
    });
  });
};

//called in async getCats() in beginning
function chooseCats(id, newTokenID){
  chooseFirstCat(id, newTokenID);
  chooseSecondCat(id, newTokenID);
};

//require both catIDs to be selected before allowed to breed
$('.cats-container').click(function(){
  if(($('#firstCatId').text() === $('#secondCatId').text())){
    $('#breedBtn').removeClass('breedReady');
    $('#breedBtn').addClass('breedNotReady');

    $('#firstCatId').text('');
    $('#secondCatId').text('');

    $('#choose-first-cat').css('border', 'none');
    $('#choose-second-cat').css('border', 'none');

  } else if($('#firstCatId').text() !== '' && $('#secondCatId').text() !== ''){
    $('#breedBtn').removeClass('breedNotReady');
    $('#breedBtn').addClass('breedReady');

  } else {
    $('#breedBtn').removeClass('breedReady');
    $('#breedBtn').addClass('breedNotReady');
  };
});

//geneString === genes from catBox, id === tokenID, newTokenID === the new ID now that id: 0 == constructor cat owned by address(0)
function addCat(geneString, gen, id, newTokenID){
  let catsDna = catDna(geneString);
  console.log(catsDna);
  console.log('Gen: ' + gen);
  catDiv(id);

  $('.gen' + id).html("GEN: " + gen);
  $('.tokenID' + id).html("Token ID: " + newTokenID);

  renderCat(catsDna, id);

  if(geneString.substring(0, 2) > 89 || geneString.substring(2, 4) > 89 || geneString.substring(4, 6) > 89 || geneString.substring(6, 8) > 89 ||
      geneString.substring(10, 12) > 89 || geneString.substring(12, 14) > 89){
    console.log('bignumber here');
    $('.rareDNA' + id).css('display', 'block');
  };
};

//breed button -- emits birth event when successfully breeds
$('#breedBtn').click(function(){
  let firstCatId = $('#firstCatId').text();
  console.log(firstCatId);
  let secondCatId = $('#secondCatId').text();
  console.log(secondCatId);

  //if cat IDs somehow end of the same- breed btn wont work
  if(firstCatId !== secondCatId){
    let newGenCat = catContractInstance.methods.breed(firstCatId, secondCatId).send({from:user});
    console.log(newGenCat);
  } else{
    alert('The cats must be different.');
  };
});

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
function catDiv(id){
  let catCard =  `<div class="col-lg-4 catBox" id="catBox` + id + `">

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

                      <div class="rareDNA rareDNA` + id + `">Rare DNA</div>

                    </div>
                    <div class='gen` + id + ` gen info-font-size'></div>
                    <div class='tokenID` + id + ` tokenID info-font-size'></div>

                  </div>`

  $('.catDivs').prepend(catCard);
};
