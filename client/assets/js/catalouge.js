let web3 = new Web3(Web3.givenProvider);

let instance;
let user;
let contractAddress = "0x38983a3Cc2C4c1dc52805e7B97709Ed3428E656D";//enter the catcontract address after you migrate

$(document).ready(function(){
  window.ethereum.enable().then(function(accounts){
    instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
    user = accounts[0];
    getCats();
  })
});

//needs to be async otherwise ownedCats will be one behind
async function getCats(){
  let ownedCats = await instance.methods.getMyCats().call({from:user});
    console.log(ownedCats);

  //message when no cats are owned
  if(ownedCats.length === 0){
    let textIfNoCats = "<p class='noCatText shadow'>Uh-oh...you don't have any cats! 🙀<br> <a href='factory.html'><button type='button' id='makeSomeHereBtn'>Make Some Here!</button></a></p>"
    $('.catDivs').append(textIfNoCats);
  }

  //blinking arrow to show to scroll down
  if(ownedCats.length > 3){
    $('#top-arrow').addClass('top-arrow-animation');
    $('#bottom-arrow').addClass('bottom-arrow-animation');
  }

  for(i = 0; i < ownedCats.length; i++){
    let cat = await instance.methods.getKitty(ownedCats[i]).call();
    addCat(cat[1], cat[2], cat[3], cat[4], cat[5], i);
    console.log(cat);
  }
};

//geneString === genes from catBox, id === tokenID
function addCat(geneString, birthTime, momID, dadID, gen, id){
  let catsDna = catDna(geneString);
  console.log(catsDna);
  catDiv(id);
  renderCat(catsDna, id)
  $('#birth' + id).html("Birthday: " + timeConverter(birthTime));
  $('#genes' + id).html("DNA: " + seperateGeneString(geneString));
  $('#gen' + id).html("GEN: " + gen);

  //shows more of the cats info on click
  $('#cat-data-btn' + id).click(function(){
    $('#cat-data' + id).css('display', 'block');
    $('#cat-data-btn' + id).css('display', 'none');

    $('#birth-popup' + id).html("Birthday: " + timeConverter(birthTime));
    $('#genes-popup' + id).html("DNA: " + seperateGeneString(geneString));
    $('#gen-popup' + id).html("GEN: " + gen);
    $('#tokenID-popup' + id).html("Token ID: " + id).css('display', 'block');
    $('#dadID-popup' + id).html("Dad ID: " + dadID).css('display', 'block');
    $('#momID-popup' + id).html("Mom ID: " + momID).css('display', 'block');

    $('#birth' + id).css('display', 'none');
    $('#genes' + id).css('display', 'none');
    $('#gen' + id).css('display', 'none');
  });

  // closes cat info popup
  $('#close' + id).click(function(){
    $('#cat-data' + id).css('display', 'none');
    $('#cat-data-btn' + id).css('display', 'block');

    $('#birth' + id).css('display', 'block');
    $('#genes' + id).css('display', 'block');
    $('#gen' + id).css('display', 'block');
  });
};

//converts unix to readable date/time
function timeConverter(UNIX_timestamp){
  let birth = new Date(UNIX_timestamp * 1000);
  let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  let year = birth.getFullYear();
  let month = months[birth.getMonth()];
  let date = birth.getDate();
  let hour = birth.getHours();
  let min = birth.getMinutes() < 10 ? '0' + birth.getMinutes() : birth.getMinutes();
  let sec = birth.getSeconds() < 10 ? '0' + birth.getSeconds() : birth.getSeconds();
  let birthday = date + ' ' + month + ', ' + year + ' ' + hour + ':' + min + ':' + sec ;
  return birthday;
}

//seperate gene string for better readability
function seperateGeneString(genes){
  let a = genes.substring(0, 2) + " " +
          genes.substring(2, 4) + " " +
          genes.substring(4, 6) + " " +
          genes.substring(6, 8) + " " +
          genes.substring(8, 9) + " " +
          genes.substring(9, 10) + " " +
          genes.substring(10, 12) + " " +
          genes.substring(12, 14) + " " +
          genes.substring(14, 15) + " " +
          genes.substring(15, 16) + " ";
  return a;
}

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
      lastNum: geneString.substring(15, 16)
  }
  return genes
};

//html for dynamically displayed cats
function catDiv(id){
      let catCard =  `<div class="col-lg-4 catBox shadow-lg" id="catBox`+id+`">

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

                        </div>

                        <div class='birth info-font-size' id='birth` + id + `'></div>
                        <div class='genes info-font-size' id='genes` + id + `'></div>
                        <div class='gen info-font-size' id='gen` + id + `'></div>

                        <button id="cat-data-btn`+id+`" class="btn cat-data-btn">Full Cat Info</button>

                        <div class="cat-data shadow" id="cat-data`+id+`">
                          <button type="button" class="close" id="close`+id+`" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                          </button>
                          <div class='birth-popup popup-font' id='birth-popup` + id + `'></div>
                          <div class='genes-popup popup-font' id='genes-popup` + id + `'></div>
                          <div class='gen-popup popup-font' id='gen-popup` + id + `'></div>
                          <div class='tokenID-popup popup-font' id='tokenID-popup` + id + `'></div>
                          <div class='dadID-popup popup-font' id='dadID-popup` + id + `'></div>
                          <div class='momID-popup popup-font' id='momID-popup` + id + `'></div>
                        </div>

                      </div>`

  $('.catDivs').append(catCard);
};

//arrows (appears when 4 or more cats are owned) dissapears when scrolled
$(window).scroll(function() {
  let scroll = $(window).scrollTop();
  if (scroll >= 150) {
    $(".arrow").css('display', 'none');
  }
});

//back-to-top btn appear and disappear
$(window).scroll(function() {
  let scroll = $(window).scrollTop();
  if (scroll >= 500) {
    $("#back-to-top").css('display', 'block');
  } else{
    $("#back-to-top").css('display', 'none');
  }
});

//back-to-top btn functionality
$('#back-to-top').click(function(){
  $('html, body').animate({scrollTop:0}, 'slow');
});
