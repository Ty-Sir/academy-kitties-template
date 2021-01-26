var colors = Object.values(allColors());

let defaultDNA = {
  "headColor": 10,
  "mouthColor": 61,
  "eyesColor": 28,
  "earsColor": 10,
  //Cattributes
  "eyesShape": 1,
  "decorationPattern": 0,
  "decorationMidColor": 62,
  "decorationSidesColor": 25,
  "animation": 3,
  "backgrounds": 1
};

// when page load
$(document).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);

  $('#dnashape').html(defaultDNA.eyesShape);
  $('#dnadecoration').html(defaultDNA.decorationPattern);
  $('#dnadecorationMid').html(defaultDNA.decorationMidColor);
  $('#dnadecorationSides').html(defaultDNA.decorationSidesColor);
  $('#dnaanimation').html(defaultDNA.animation);
  $('#dnabackground').html(defaultDNA.backgrounds);

  $('#cattributes').css('display', 'none');
  renderCat(defaultDNA)
});

//cattributes button
$('#cattributesBtn').click(function(){
  $('#cattributes').css('display', 'block');
  $('#catColors').css('display', 'none');
  $('#colorBtn').removeClass('active');
  $('#cattributesBtn').addClass('active');
});

//colors button
$('#colorBtn').click(function(){
  $('#cattributes').css('display', 'none')
  $('#catColors').css('display', 'block')
  $('#colorBtn').addClass('active');
  $('#cattributesBtn').removeClass('active');
});

//random numbers 10-89
function randomNum89(){
  let num = Math.floor(Math.random()*80)+10;
  return num
};

//random numbers 1-7
function randomNum7() {
  let num = Math.floor(Math.random()*7)+1;
  return num
};

//random numbers 0-9
function randomNum9() {
  let num = Math.floor(Math.random()*10);
  return num
};

//random kitty button
$('#randomBtn').on('click',function(){
  let randomDNA = {
    "headColor": randomNum89(),
    "mouthColor": randomNum89(),
    "eyesColor": randomNum89(),
    "earsColor": randomNum89(),
    "eyesShape": randomNum7(),
    "decorationPattern": randomNum9(),
    "decorationMidColor": randomNum89(),
    "decorationSidesColor": randomNum89(),
    "animation": randomNum7(),
    "backgrounds": randomNum9()
  }
  renderCat(randomDNA);
});

//default kitty button
$('#defaultBtn').on('click',function() {
  renderCat(defaultDNA);
});

//dna numbers on page
function getDna(){
  var dna = ''
  dna += $('#dnabody').html();
  dna += $('#dnamouth').html();
  dna += $('#dnaeyes').html();
  dna += $('#dnaears').html();
  dna += $('#dnashape').html();
  dna += $('#dnadecoration').html();
  dna += $('#dnadecorationMid').html();
  dna += $('#dnadecorationSides').html();
  dna += $('#dnaanimation').html();
  dna += $('#dnabackground').html();

  return parseInt(dna);
};

//drawing the cat
function renderCat(dna){
  headColor(colors[dna.headColor],dna.headColor);
  $('#bodyColor').val(dna.headColor);

  mouthColor(colors[dna.mouthColor],dna.mouthColor);
  $('#mouthColor').val(dna.mouthColor);

  eyesColor(colors[dna.eyesColor],dna.eyesColor);
  $('#eyesColor').val(dna.eyesColor);

  earsColor(colors[dna.earsColor],dna.earsColor);
  $('#earsColor').val(dna.earsColor);

  eyeVariation(dna.eyesShape);
  $('#eyeShape').val(dna.eyesShape);

  markingPattern(dna.decorationPattern);
  $('#markingShape').val(dna.decorationPattern);

  decorationMidColor(colors[dna.decorationMidColor],dna.decorationMidColor);
  $('#decorationMidColor').val(dna.decorationMidColor);

  decorationSidesColor(colors[dna.decorationSidesColor],dna.decorationSidesColor);
  $('#decorationSidesColor').val(dna.decorationSidesColor);

  animationVariation(dna.animation);
  $('#animation').val(dna.animation);

  backgroundVariation(dna.backgrounds);
  $('#backgrounds').val(dna.backgrounds);
};

// Changing cat colors
$('#bodyColor').change(()=>{
  var colorVal = $('#bodyColor').val();
  headColor(colors[colorVal],colorVal);
});

$('#mouthColor').change(()=>{
  var colorVal = $('#mouthColor').val();
  mouthColor(colors[colorVal],colorVal);
});

$('#eyesColor').change(()=>{
  var colorVal = $('#eyesColor').val();
  eyesColor(colors[colorVal],colorVal);
});

$('#earsColor').change(()=>{
  var colorVal = $('#earsColor').val();
  earsColor(colors[colorVal],colorVal);
});

//changing eye Shape
$('#eyeShape').change(()=>{
  var shape = parseInt($('#eyeShape').val());  //between 1 and 7
  eyeVariation(shape);
});

//changing marking Pattern
$('#markingShape').change(()=>{
  var pattern = parseInt($('#markingShape').val()); //between 0 and 9
  markingPattern(pattern);
});

//changing middle marks color
$('#decorationMidColor').change(()=>{
  var colorVal = $('#decorationMidColor').val();
  decorationMidColor(colors[colorVal],colorVal);
});

// changing side marks color
$('#decorationSidesColor').change(()=>{
  var colorVal = $('#decorationSidesColor').val();
  decorationSidesColor(colors[colorVal],colorVal);
});

//animations
$('#animation').change(()=>{
  var animationVal = parseInt($('#animation').val());
  animationVariation(animationVal);
});

//special backgrounds
$('#backgrounds').change(()=>{
  var backgroundVal = parseInt($('#backgrounds').val());
  backgroundVariation(backgroundVal);
});
