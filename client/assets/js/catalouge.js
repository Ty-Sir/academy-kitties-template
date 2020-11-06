//time allowed for async func to load - wouldn't work without
//calls addCat and the calls to the contract
setTimeout(function(){
  getCats();
},100);

//geneString === genes from catBox, id === tokenID
function addCat(geneString, id){
  let catsDna = catDna(geneString);
  console.log(catsDna);
  catDiv(id);
  renderCat(catsDna, id)
  $('#genes' + id).html("DNA: " + geneString)
};

//genes split up for functions to read
function catDna(geneString){
  let genes = {
      "headColor": geneString.substring(0, 2),
      "mouthColor": geneString.substring(2, 4),
      "eyesColor": geneString.substring(4, 6),
      "earsColor": geneString.substring(6, 8),
      //Cattributes
      "eyesShape": geneString.substring(8, 9),
      "decorationPattern": geneString.substring(9, 10),
      "decorationMidColor": geneString.substring(10, 12),
      "decorationSidesColor": geneString.substring(12, 14),
      "animation": geneString.substring(14, 15),
      "lastNum": geneString.substring(15, 16)
  }
  return genes
};

//html for dynamically displayed cats
function catDiv(id){
      let catCard =  `<div class="col-lg-4 catBox shadow-lg">
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

                            <div class="chin_hair chin_hair_left chin_hair_left` + id + `"></div>
                            <div class="chin_hair chin_hair_middle chin_hair_middle` + id + `"></div>
                            <div class="chin_hair chin_hair_right chin_hair_right` + id + `"></div>
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
                          <div class='genes' id='genes`+id+`'></div>

                      </div>`

  $('.catDivs').append(catCard);
};

//arrow (appears when 4 or more cats are owned) dissapears when scrolled
$(window).scroll(function() {
  let scroll = $(window).scrollTop();
  if (scroll >= 150) {
    $(".arrow").css('display', 'none');
  }
});

//drawing the cat
function renderCat(genes, id){
  headColor(genes.headColor, id)

  mouthColor(genes.mouthColor, id)

  eyesColor(genes.eyesColor, id)

  earsColor(genes.earsColor, id)

  eyeVariation(genes.eyesShape, id)

  markingPattern(genes.decorationPattern, id)

  decorationMidColor(genes.decorationMidColor, id)

  decorationSidesColor(genes.decorationSidesColor, id)

  animationVariation(genes.animation, id)
};

var colors = Object.values(allColors());

//changing colors
function headColor(gene, id) {
  let color = colors[gene];
  $('.head' + id + ', .body' + id + ', .front_leg' + id + ', .back_leg' + id).css('background', '#' + color)  //This changes the color of the cat
};

function mouthColor(gene, id) {
  let color = colors[gene];
  $('.mouth' + id + ', .belly' + id + ', .tail' + id).css('background', '#' + color)
};

function eyesColor(gene, id) {
  let color = colors[gene];
  $('.iris' + id).css('background', '#' + color)
};

function earsColor(gene, id) {
  let color = colors[gene];
  $('.ear' + id + ', .back_paw' + id + ', .front_paw' + id).css('background', '#' + color)
};

function decorationMidColor(gene, id) {
  let color = colors[gene];
  $('.chin_hair_middle' + id + ', .head_marking' + id).css('background', '#' + color)
};

function decorationSidesColor(gene, id) {
  let color = colors[gene];
  $('.chin_hair_left' + id + ', .chin_hair_right' + id + ', .facemark_left' + id + ', .facemark_right' + id + ', .sidemark_left' + id + ', .sidemark_right' + id + ', .sidemark_left_dot' + id + ', .sidemark_right_dot' + id).css('background', '#' + color)
};

//eye variations
function eyeVariation(gene, id) {
  switch (gene) {
    case '1':
      basicEyes(id)
      break
    case '2':
      basicEyes(id)
      tallBoys(id)
      break
    case '3':
      basicEyes(id)
      lookingLeft(id)
      break
    case '4':
      basicEyes(id)
      pipSqueak(id)
      break
    case '5':
      basicEyes(id)
      wonky(id)
      break
    case '6':
      basicEyes(id)
      catEyes(id)
      break
    case '7':
      basicEyes(id)
      roboto(id)
      break
  }
};

function basicEyes(id) {
  let eye = $('.eye' + id);
  let iris = $('.iris' + id);
  let pupil = $('.pupils' + id);
  let highlight = $('.pupil_highlight' + id);

  eye.css({'width': '50px', 'height': '50px'});
  iris.css({'top': '10px', 'left': '50%', 'width': '30px', 'height': '30px','border-radius': '50%', 'transform': 'translateX(-50%)'});
  pupil.css({'width': '25px', 'height': '25px', 'border-radius': '50%', 'top': '2px', 'transform': 'rotate(0deg)', 'margin': 'auto'});
  highlight.css({'width': '10px', 'height': '10px', 'bottom': '25px', 'border-radius': '50%', 'left': '0', 'transform': 'rotate(0deg)'});
};

function tallBoys(id) {
  let iris = $('.iris' + id);
  let pupil = $('.pupils' + id);
  let highlight = $('.pupil_highlight' + id);

  iris.css({'width': '10px', 'height': '40px', 'top': '4px'});
  pupil.css({'width': '5px', 'height': '35px'});
  highlight.css({'width': '4px', 'height': '10px', 'bottom': '33px'});
};

function lookingLeft(id) {
  let iris = $('.iris' + id);
  let pupil = $('.pupils' + id);

  iris.css('left', '38%');
  pupil.css('top', '2px');
};

function pipSqueak(id){
  let iris = $('.iris' + id);
  let pupil = $('.pupils' + id);
  let highlight = $('.pupil_highlight' + id);

  iris.css({'height': '15px', 'width': '15px', 'top': '18px'});
  pupil.css({'height': '11px', 'width': '11px'});
  highlight.css({'height': '5px', 'width': '5px', 'bottom': '11px'});
};

function wonky(id){
  let iris_left = $('.iris_left' + id);
  let iris_right = $('.iris_right' + id);

  iris_left.css({'top': '15px', 'left': '35%'});
  iris_right.css({'bottom': '-15px', 'left': '70%'});
};

function catEyes(id){
  let iris = $('.iris' + id);
  let pupil = $('.pupils' + id);
  let highlight = $('.pupil_highlight' + id);

  iris.css({'height': '40px', 'width': '40px', 'top': '5px'});
  pupil.css({'border-radius': '90% 0 90% 0', 'transform': 'rotate(-45deg)', 'top': '7px'});
  highlight.css({'border-radius': '90% 0% 90% 0','left': '10px', 'bottom': '20px','transform': 'rotate(-45deg)'});
};

function roboto(id){
  let iris = $('.iris' + id);
  let pupil = $('.pupils' + id);
  let highlight = $('.pupil_highlight' + id);

  iris.css({'width': '40px', 'height': '20px', 'border-radius': '10%', 'top': '15px'});
  pupil.css({'width': '33px', 'height': '15px', 'border-radius': '10%'});
  highlight.css({'width': '5px', 'height': '3px', 'border-radius': '10%', 'bottom': '12px', 'left': '10px'});
};

//marking patterns
function markingPattern(gene, id) {
    switch (gene) {
      case '0':
        chinHair(id)
        break
      case '1':
        chinHair(id)
        cheeky(id)
        break
      case '2':
        chinHair(id)
        shoulders(id)
        break
      case '3':
        chinHair(id)
        naked(id)
        break
      case '4':
        chinHair(id)
        headLine(id)
        break
      case '5':
        chinHair(id)
        allHeadMarkings(id)
        break
      case '6':
        chinHair(id)
        shouldersAndChin(id)
        break
      case '7':
        chinHair()
        singleChin(id)
        break
      case '8':
        chinHair(id)
        singleChinAndHeadLine(id)
        break
      case '9':
        chinHair(id)
        allMarkings(id)
        break
    }
};

function chinHair(id) {
  let headmarking = $('.head_marking' + id);
  let chin_hair = $('.chin_hair' + id);
  let chin_hair_middle = $('.chin_hair_middle' + id);
  let left_cheek = $('.facemark_left' + id);
  let right_cheek = $('.facemark_right' + id);
  let sidemark_left = $('.sidemark_left' + id);
  let sidemark_right = $('.sidemark_right' + id);

  chin_hair.css('display', 'block');
  chin_hair_middle.css('top', '30px');
  headmarking.css('display', 'none');
  sidemark_left.css('display', 'none');
  sidemark_right.css('display', 'none');
  left_cheek.css('display', 'none');
  right_cheek.css('display', 'none');
};

function cheeky(id){
  let left_cheek = $('.facemark_left' + id);
  let right_cheek = $('.facemark_right' + id);
  let chin_hair = $('.chin_hair' + id);

  left_cheek.css('display', 'block');
  right_cheek.css('display', 'block');
  chin_hair.css('display', 'none');
};

function shoulders(id){
  let chin_hair = $('.chin_hair' + id);
  let sidemark_left = $('.sidemark_left' + id);
  let sidemark_right = $('.sidemark_right' + id);

  chin_hair.css('display', 'none');
  sidemark_left.css('display', 'block');
  sidemark_right.css('display', 'block');
};

function naked(id){
  let chin_hair = $('.chin_hair' + id);

  chin_hair.css('display', 'none');
};

function headLine(id){
  let chin_hair = $('.chin_hair' + id);
  let headmarking = $('.head_marking' + id);

  headmarking.css('display', 'block');
  chin_hair.css('display', 'none');
};

function allHeadMarkings(id){
  let headmarking = $('.head_marking' + id);
  let chin_hair = $('.chin_hair' + id);
  let left_cheek = $('.facemark_left' + id);
  let right_cheek = $('.facemark_right' + id);

  chin_hair.css('display', 'block');
  headmarking.css('display', 'block');
  left_cheek.css('display', 'block');
  right_cheek.css('display', 'block');
};

function shouldersAndChin(id) {
  let sidemark_left = $('.sidemark_left' + id);
  let sidemark_right = $('.sidemark_right' + id);

  sidemark_left.css('display', 'block');
  sidemark_right.css('display', 'block');
};

function singleChin(id){
  let chin_hair_left = $('.chin_hair_left' + id);
  let chin_hair_middle = $('.chin_hair_middle' + id);
  let chin_hair_right = $('.chin_hair_right' + id);

  chin_hair_left.css('display', 'none');
  chin_hair_right.css('display', 'none');
  chin_hair_middle.css({'display': 'block', 'top': '45px'});
};

function singleChinAndHeadLine(id) {
  headLine(id);
  singleChin(id);
};

function allMarkings(id) {
  shoulders(id);
  allHeadMarkings(id);
};

//animations
function animationVariation(gene, id) {
  switch (gene) {
    case '1':
      animationType1(id)
      break;
    case '2':
      animationType2(id)
      break;
    case '3':
      animationType3(id)
      break;
    case '4':
      animationType4(id)
      break;
    case '5':
      animationType5(id)
      break;
    case '6':
      animationType6(id)
      break;
    case '7':
      animationType7(id)
      break;
  }
};

function resetAnimation(id) {
  $('.eye' + id).removeClass('pulsingEyes blink');
  $('.animationEye' + id).removeClass('ping');
  $('.left_ear' + id).removeClass('left_ear_wiggle leftEarWobble levitateLeftEar');
  $('.right_ear' + id).removeClass('right_ear_wiggle rightEarWobble levitateRightEar');
  $('.head' + id).removeClass('headWobble');
  $('.tail' + id).removeClass('tailWag');
  $('.iris' + id).removeClass('blinkEdit');
  $('.pupils' + id).removeClass('blinkEdit');
  $('.pupil_highlight' + id).removeClass('blinkEdit');
  $('.cat' + id).removeClass('levitate');
  $('.mouth' + id).removeClass('levitateMouth');
};

function animationType1(id) {
  resetAnimation(id);
  $('.eye' + id).addClass('pulsingEyes');
};

function animationType2(id) {
  resetAnimation(id);
  $('.animationEye' + id).addClass('ping');
};

function animationType3(id){
  resetAnimation(id);
  $('.left_ear' + id).addClass('left_ear_wiggle');
  $('.right_ear' + id).addClass('right_ear_wiggle');
};

function animationType4(id) {
  resetAnimation(id);
  $('.head' + id).addClass('headWobble');
  $('.left_ear' + id).addClass('leftEarWobble');
  $('.right_ear' + id).addClass('rightEarWobble');
};

function animationType5(id) {
  resetAnimation(id);
  $('.tail' + id).addClass('tailWag');
};

function animationType6(id) {
  resetAnimation(id);
  $('.cat' + id).addClass('levitate');
  $('.mouth' + id).addClass('levitateMouth');
  $('.left_ear' + id).addClass('levitateLeftEar');
  $('.right_ear' + id).addClass('levitateRightEar');
};

function animationType7(id) {
  resetAnimation(id);
  $('.eye' + id).addClass('blink');
  $('.iris' + id).addClass('blinkEdit');
  $('.pupils' + id).addClass('blinkEdit');
  $('.pupil_highlight' + id).addClass('blinkEdit');
};
