//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
};

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
};


//changing colors
function headColor(color,code) {
  $('.head, .body, .front_leg, .back_leg').css('background', '#' + color)  //This changes the color of the cat
  $('#headCode').html('code: '+ code) //This updates text of the badge next to the slider
  $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
};

function mouthColor(color,code) {
  $('.mouth, .belly, .tail').css('background', '#' + color)
  $('#mouthCode').html('code: '+ code)
  $('#dnamouth').html(code)
};

function eyesColor(color,code) {
  $('.iris').css('background', '#' + color)
  $('#eyeCode').html('code: '+ code)
  $('#dnaeyes').html(code)
};

function earsColor(color,code) {
  $('.ear, .back_paw, .front_paw').css('background', '#' + color)
  $('#earsCode').html('code: '+ code)
  $('#dnaears').html(code)
};

function decorationMidColor(color,code) {
  $('.chin_hair_middle, .head_marking').css('background', '#' + color)
  $('#decorationMidCode').html('code: '+ code)
  $('#dnadecorationMid').html(code)
};

function decorationSidesColor(color,code) {
  $('.chin_hair_left, .chin_hair_right, .facemark_left, .facemark_right, .sidemark_left, .sidemark_right, .sidemark_left_dot, .sidemark_right_dot').css('background', '#' + color)
  $('#decorationSidesCode').html('code: '+ code)
  $('#dnadecorationSides').html(code)
};

//eye variations
function eyeVariation(num) {
  $('#dnashape').html(num)
  switch (num) {
    case 1:
      basicEyes()
      $('#eyeName').html('Basic')
      break
    case 2:
      basicEyes()
      $('#eyeName').html('Tall-Boys')
      tallBoys()
      break
    case 3:
      basicEyes()
      $('#eyeName').html('Looking Left')
      lookingLeft()
      break
    case 4:
      basicEyes()
      $("#eyeName").html("Pip Squeak")
      pipSqueak()
      break
    case 5:
      basicEyes()
      $("#eyeName").html("Wonky")
      wonky()
      break
    case 6:
      basicEyes()
      $("#eyeName").html("Cat Eyes")
      catEyes()
      break
    case 7:
      basicEyes()
      $("#eyeName").html("Mr. Roboto")
      roboto()
      break
  }
};

let eye = $('.eye');
let iris = $('.iris');
let iris_left = $('.iris_left');
let iris_right = $('.iris_right');
let pupil = $('.pupils');
let highlight = $('.pupil_highlight');

function basicEyes() {
  eye.css({'width': '50px', 'height': '50px'});
  iris.css({'top': '10px', 'left': '50%', 'width': '30px', 'height': '30px','border-radius': '50%', 'transform': 'translateX(-50%)'});
  pupil.css({'width': '25px', 'height': '25px',  'border-radius': '50%', 'top': '2px', 'transform': 'rotate(0deg)', 'margin': 'auto'});
  highlight.css({'width': '10px', 'height': '10px', 'bottom': '25px', 'border-radius': '50%', 'left': '0', 'transform': 'rotate(0deg)'});
};

function tallBoys() {
  iris.css({'width': '10px', 'height': '40px', 'top': '4px'});
  pupil.css({'width': '5px', 'height': '35px'});
  highlight.css({'width': '4px', 'height': '10px', 'bottom': '33px'});
};

function lookingLeft() {
  iris.css('left', '38%');
  pupil.css('top', '2px');
};

function pipSqueak(){
  iris.css({'height': '15px', 'width': '15px', 'top': '18px'});
  pupil.css({'height': '11px', 'width': '11px'});
  highlight.css({'height': '5px', 'width': '5px', 'bottom': '11px'});
};

function wonky(){
  iris_left.css({'top': '15px', 'left': '35%'});
  iris_right.css({'bottom': '-15px', 'left': '70%'});
};

function catEyes(){
  iris.css({'height': '40px', 'width': '40px', 'top': '5px'});
  pupil.css({'border-radius': '90% 0 90% 0', 'transform': 'rotate(-45deg)', 'top': '7px'});
  highlight.css({'border-radius': '90% 0% 90% 0','left': '10px', 'bottom': '20px','transform': 'rotate(-45deg)'});
};

function roboto(){
  iris.css({'width': '40px', 'height': '20px', 'border-radius': '10%', 'top': '15px'});
  pupil.css({'width': '33px', 'height': '15px', 'border-radius': '10%'});
  highlight.css({'width': '5px', 'height': '3px', 'border-radius': '10%', 'bottom': '12px', 'left': '10px'});
};

//marking patterns
function markingPattern(num) {
    $('#dnadecoration').html(num)
    switch (num) {
      case 0:
        chinHair()
        $('#markingName').html('Chin Hair')
        break
      case 1:
        chinHair()
        $('#markingName').html('Cheeky')
        cheeky()
        break
      case 2:
        chinHair()
        $('#markingName').html('Shoulders')
        shoulders()
        break
      case 3:
        chinHair()
        $('#markingName').html('Naked')
        naked()
        break
      case 4:
        chinHair()
        $('#markingName').html('Head Line')
        headLine()
        break
      case 5:
        chinHair()
        $('#markingName').html('All Head Markings')
        allHeadMarkings()
        break
      case 6:
        chinHair()
        $('#markingName').html('Shoulders and Chin Hair')
        shouldersAndChin()
        break
      case 7:
        chinHair()
        $('#markingName').html('Single Chin Hair')
        singleChin()
        break
      case 8:
        chinHair()
        $('#markingName').html('Single Chin Hair and Head Line')
        singleChinAndHeadLine()
        break
      case 9:
        chinHair()
        $('#markingName').html('All Markings')
        allMarkings()
        break
    }
};

let headmarking = $('.head_marking');
let chin_hair = $('.chin_hair');
let chin_hair_left = $('.chin_hair_left');
let chin_hair_middle = $('.chin_hair_middle');
let chin_hair_right = $('.chin_hair_right');
let left_cheek = $('.facemark_left');
let right_cheek = $('.facemark_right');
let sidemark_left = $('.sidemark_left');
let sidemark_right = $('.sidemark_right');

function chinHair() {
  //Remove all style from other decorations
  //In this way we can also use normalMarking() to reset the decoration style
  chin_hair.css('display', 'block');
  chin_hair_middle.css('top', '30px');
  headmarking.css('display', 'none');
  sidemark_left.css('display', 'none');
  sidemark_right.css('display', 'none');
  left_cheek.css('display', 'none');
  right_cheek.css('display', 'none');
};

function cheeky(){
  left_cheek.css('display', 'block');
  right_cheek.css('display', 'block');
  chin_hair.css('display', 'none');
};

function shoulders(){
  chin_hair.css('display', 'none');
  sidemark_left.css('display', 'block');
  sidemark_right.css('display', 'block');
};

function naked(){
  chin_hair.css('display', 'none');
};

function headLine(){
  headmarking.css('display', 'block');
  chin_hair.css('display', 'none');
};

function allHeadMarkings(){
  chin_hair.css('display', 'block');
  headmarking.css('display', 'block');
  left_cheek.css('display', 'block');
  right_cheek.css('display', 'block');
};

function shouldersAndChin() {
  sidemark_left.css('display', 'block');
  sidemark_right.css('display', 'block');
};

function singleChin(){
  chin_hair_left.css('display', 'none');
  chin_hair_right.css('display', 'none');
  chin_hair_middle.css({'display': 'block', 'top': '45px'});
};

function singleChinAndHeadLine() {
  headLine();
  singleChin();
};

function allMarkings() {
  shoulders();
  allHeadMarkings();
};

//animations
function animationVariation(num) {
  $('#dnaanimation').html(num);
  switch (num) {
    case 1:
      animationType1()
      $('#animationName').html('Pulsing Eyes')
      break;
    case 2:
      animationType2()
      $('#animationName').html("Ping!")
      break;
    case 3:
      animationType3()
      $('#animationName').html("Ear Wiggle")
      break;
    case 4:
      animationType4()
      $('#animationName').html("Head Wobble")
      break;
    case 5:
      animationType5()
      $('#animationName').html("Tail Wag")
      break;
    case 6:
      animationType6()
      $('#animationName').html("Levitate")
      break;
    case 7:
      animationType7()
      $('#animationName').html("Blink Blink")
      break;
  }
};

function resetAnimation() {
  $('.eye').removeClass('pulsingEyes blink');
  $('.animationEye').removeClass('ping');
  $('.left_ear').removeClass('left_ear_wiggle leftEarWobble levitateLeftEar');
  $('.right_ear').removeClass('right_ear_wiggle rightEarWobble levitateRightEar');
  $('.head').removeClass('headWobble');
  $('.tail').removeClass('tailWag');
  $('.iris').removeClass('blinkEdit');
  $('.pupils').removeClass('blinkEdit');
  $('.pupil_highlight').removeClass('blinkEdit');
  $('.cat').removeClass('levitate');
  $('.mouth').removeClass('levitateMouth');
};

function animationType1() {
  resetAnimation();
  $('.eye').addClass('pulsingEyes');
};

function animationType2() {
  resetAnimation();
  $('.animationEye').addClass('ping');
};

function animationType3(){
  resetAnimation();
  $('.left_ear').addClass('left_ear_wiggle');
  $('.right_ear').addClass('right_ear_wiggle');
};

function animationType4() {
  resetAnimation();
  $('.head').addClass('headWobble');
  $('.left_ear').addClass('leftEarWobble');
  $('.right_ear').addClass('rightEarWobble');
};

function animationType5() {
  resetAnimation();
  $('.tail').addClass('tailWag');
};

function animationType6() {
  resetAnimation();
  $('.cat').addClass('levitate');
  $('.mouth').addClass('levitateMouth');
  $('.left_ear').addClass('levitateLeftEar');
  $('.right_ear').addClass('levitateRightEar');
};

function animationType7() {
  resetAnimation();
  $('.eye').addClass('blink');
  $('.iris').addClass('blinkEdit');
  $('.pupils').addClass('blinkEdit');
  $('.pupil_highlight').addClass('blinkEdit');
};
