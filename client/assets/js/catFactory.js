
//Random color
function getColor() {
    var randomColor = Math.floor(Math.random() * 16777215).toString(16);
    return randomColor
}

function genColors(){
    var colors = []
    for(var i = 10; i < 99; i ++){
      var color = getColor()
      colors[i] = color
    }
    return colors
}

//This function code needs to modified so that it works with Your cat code.
function headColor(color,code) {
  $('.head, .body').css('background', '#' + color)  //This changes the color of the cat
  $('#headCode').html('code: '+ code) //This updates text of the badge next to the slider
  $('#dnabody').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function mouthColor(color,code) {
  $('.mouth, .belly, .tail').css('background', '#' + color)  //This changes the color of the cat
  $('#mouthCode').html('code: '+ code) //This updates text of the badge next to the slider
  $('#dnamouth').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function eyesColor(color,code) {
  $('.iris').css('background', '#' + color)  //This changes the color of the cat
  $('#eyeCode').html('code: '+ code) //This updates text of the badge next to the slider
  $('#dnaeyes').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function earsColor(color,code) {
  $('.ear, .back_paw, .front_paw, .leg, .back_leg').css('background', '#' + color)  //This changes the color of the cat
  $('#earsCode').html('code: '+ code) //This updates text of the badge next to the slider
  $('#dnaears').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function decorationMidColor(color,code) {
  $('.chin_hair_middle, .head_marking').css('background', '#' + color)  //This changes the color of the cat
  $('#decorationMidCode').html('code: '+ code) //This updates text of the badge next to the slider
  $('#dnadecorationMid').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function decorationSidesColor(color,code) {
  $('.chin_hair_left, .chin_hair_right, .facemark_left, .facemark_right, .sidemark_left, .sidemark_right, .sidemark_left_dot, .sidemark_right_dot').css('background', '#' + color)  //This changes the color of the cat
  $('#decorationSidesCode').html('code: '+ code) //This updates text of the badge next to the slider
  $('#dnadecorationSides').html(code) //This updates the body color part of the DNA that is displayed below the cat
}

function eyeVariation(num) {
  $('#dnashape').html(num)
  switch (num) {
    case 1:
      normalEyes()
      $('#eyeName').html('Basic')
      break
    case 2:
      normalEyes()
      $('#eyeName').html('Chill')
      eyesType1()
      break
    case 3:
      normalEyes()
      $('#eyeName').html('Look Left')
      eyesType2()
      break
    case 4:
      normalEyes()
      $("#eyeName").html("Squinty")
      eyesType3()
      break
    case 5:
      normalEyes()
      $("#eyeName").html("Wonky")
      eyesType4()
      break
    case 6:
      normalEyes()
      $("#eyeName").html("Cat Eyes")
      eyesType5()
      break
    case 7:
      normalEyes()
      $("#eyeName").html("Long")
      eyesType6()
      break
  }
}

let eye = $('.eye');
let iris = $('.iris');
let iris_left = $('.iris_left');
let iris_right = $('.iris_right');
let pupil = $('.pupils');
let highlight = $('.pupil_highlight');

async function normalEyes() {
  $('.eyes').find(eye).css({'border-top': 'none', 'border-bottom': 'none'});
  $('.eyes').find(iris).css({'top': '10px', 'left': '10px', 'width': '30px', 'height': '30px','border-radius': '50%'});
  $('.eyes').find(pupil).css({'width': '25px', 'height': '25px',  'border-radius': '50%', 'top': '2px'});
  $('.eyes').find(highlight).css({'width': '10px', 'height': '10px', 'bottom': '25px', 'border-radius': '50%', 'left': '1px'});
}

function eyesType1() {
  $('.eyes').find(eye).css({'border-top': '8px solid'});
  $('.eyes').find(iris).css({'top': '5px'});
}

function eyesType2() {
  $('.eyes').find(iris).css({'left': '3px'});
}

function eyesType3(){
  $('.eyes').find(eye).css({'border-top': '15px solid', 'border-bottom': '15px solid'});
  $('.eyes').find(iris).css({'width': '15px', 'height': '15px', 'top': '1px', 'left': '15px'});
  $('.eyes').find(pupil).css({'width': '12px', 'height': '12px'});
  $('.eyes').find(highlight).css({'width': '5px', 'height': '5px', 'bottom': '10px'});
}

function eyesType4(){
  $('.eyes').find(iris_left).css({'top': '15px', 'left': '2px'});
  $('.eyes').find(iris_right).css({'bottom': '-15px', 'left': '20px'});
}

function eyesType5(){
  $('.eyes').find(iris).css({'height': '40px', 'width': '40px', 'left': '5px', 'top': '5px'});
  $('.eyes').find(pupil).css({'border-radius': '90% 0 90% 0', 'transform': 'rotate(-45deg)', 'top': '7px'});
  $('.eyes').find(highlight).css({'border-radius': '70% 0 70% 0','left': '8px', 'bottom': '23px', 'height': '15px','transform': 'rotate(-25deg)'});
}

function eyesType6(){
  $('.eyes').find(iris).css({'width': '40px', 'height': '20px', 'border-radius': '10px', 'top': '15px', 'left': '5px'});
  $('.eyes').find(pupil).css({'width': '33px', 'height': '15px', 'border-radius': '10px', 'transform': 'rotate(-180deg)'});
  $('.eyes').find(highlight).css({'width': '5px', 'height': '3px', 'border-radius': '10px', 'bottom': '12px', 'left': '10px', 'transform': 'rotate(0deg)'});
}

function markingPattern(num) {
    $('#dnadecoration').html(num)
    switch (num) {
      case 1:
        normalMarking()
        $('#markingName').html('Chin Hair')
        break
      case 2:
        normalMarking()
        $('#markingName').html('Cheeky')
        markingType1()
        break
      case 3:
        normalMarking()
        $('#markingName').html('Shoulders')
        markingType2()
        break
      case 4:
        normalMarking()
        $('#markingName').html('Chin Hair Sides')
        markingType3()
        break
      case 5:
        normalMarking()
        $('#markingName').html('Head Line')
        markingType4()
        break
      case 6:
        normalMarking()
        $('#markingName').html('All Head Markings')
        markingType5()
        break
      case 7:
        normalMarking()
        $('#markingName').html('Shoulders and Chin Hair')
        markingType6()
        break
      case 8:
        normalMarking()
        $('#markingName').html('Single Chin Hair')
        markingType7()
        break
      case 9:
        normalMarking()
        $('#markingName').html('Single Chin Hair and Head Line')
        markingType8()
        break
      case 10:
        normalMarking()
        $('#markingName').html('All Markings')
        markingType9()
        break
      case 11:
        normalMarking()
        $('#markingName').html('Naked')
        markingType10()
        break
    }
}

let headmarking = $('.head_marking');
let belly = $('.belly');
let chin_hair = $('.chin_hair');
let chin_hair_left = $('.chin_hair_left');
let chin_hair_middle = $('.chin_hair_middle');
let chin_hair_right = $('.chin_hair_right');
let left_cheek = $('.facemark_left');
let right_cheek = $('.facemark_right');
let sidemark_left = $('.sidemark_left');
let sidemark_right = $('.sidemark_right');

async function normalMarking() {
  //Remove all style from other decorations
  //In this way we can also use normalMarking() to reset the decoration style
  $('.head').find(chin_hair).css({'display': 'block'});
  $('.head').find(chin_hair_right).css({'top': '15px', 'transform': 'rotate(10deg)'});
  $('.head').find(chin_hair_left).css({'transform': 'rotate(-10deg)'});
  $('.head').find(chin_hair_middle).css({'display': 'block', 'top': '30px'});
  $('.head').find(headmarking).css({'display': 'none'});
  $('.body').find(sidemark_left).css({'display': 'none'});
  $('.body').find(sidemark_right).css({'display': 'none'});
  $('.head').find(left_cheek).css({'display': 'none', 'border-radius': '10px', 'width': '20px', 'left': '22px'});
  $('.head').find(right_cheek).css({'display': 'none', 'border-radius': '10px', 'width': '20px', 'left': '158px'});
}

function markingType1(){
  $('.head').find(left_cheek).css({'display': 'block'});
  $('.head').find(right_cheek).css({'display': 'block'});
}

function markingType2(){
  $('.head').find(chin_hair).css({'display': 'none'});
  $('.body').find(sidemark_left).css({'display': 'block'});
  $('.body').find(sidemark_right).css({'display': 'block'});
}

function markingType3(){
  $('.head').find(chin_hair_middle).css({'display': 'none'});
  $('.head').find(chin_hair_left).css({'display': 'block'});
  $('.head').find(chin_hair_right).css({'display': 'block', 'top': '38px'});
}

function markingType4(){
  $('.head').find(headmarking).css({'display': 'block', 'height': "70px"});
}

function markingType5(){
  $('.head').find(chin_hair).css({'display': 'block'});
  $('.head').find(headmarking).css({'display': 'block', 'height': "70px"});
  $('.head').find(left_cheek).css({'display': 'block'});
  $('.head').find(right_cheek).css({'display': 'block'});
}

function markingType6() {
  $('.head').find(chin_hair).css({'display': 'block'});
  $('.body').find(sidemark_left).css({'display': 'block'});
  $('.body').find(sidemark_right).css({'display': 'block'});
}

function markingType7(){
  $('.head').find(chin_hair_left).css({'display': 'none'});
  $('.head').find(chin_hair_right).css({'display': 'none'});
  $('.head').find(chin_hair_middle).css({'display': 'block', 'top': '45px'});
}

function markingType8() {
  markingType4();
  markingType7();
}

function markingType9() {
  markingType2();
  markingType5();
}

function markingType10() {
  normalMarking();
  $('.head').find(chin_hair).css({'display': 'none'});
}
