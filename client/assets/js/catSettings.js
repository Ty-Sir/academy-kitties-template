var colors = Object.values(allColors())

var defaultDNA = {
  "headColor" : 10,
  "mouthColor" : 61,
  "eyesColor" : 28,
  "earsColor" : 10,
  //Cattributes
  "eyesShape" : 1,
  "decorationPattern" : 0,
  "decorationMidColor" : 62,
  "decorationSidesColor" : 25,
  "animation" :  1,
  "lastNum" :  1
  }

// when page load
$( document ).ready(function() {
  $('#dnabody').html(defaultDNA.headColor);
  $('#dnamouth').html(defaultDNA.mouthColor);
  $('#dnaeyes').html(defaultDNA.eyesColor);
  $('#dnaears').html(defaultDNA.earsColor);

  $('#dnashape').html(defaultDNA.eyesShape)
  $('#dnadecoration').html(defaultDNA.decorationPattern)
  $('#dnadecorationMid').html(defaultDNA.decorationMidColor)
  $('#dnadecorationSides').html(defaultDNA.decorationSidesColor)
  $('#dnaanimation').html(defaultDNA.animation)
  $('#dnaspecial').html(defaultDNA.lastNum)

  renderCat(defaultDNA)
});

function getDna(){
  var dna = ''
  dna += $('#dnabody').html()
  dna += $('#dnamouth').html()
  dna += $('#dnaeyes').html()
  dna += $('#dnaears').html()
  dna += $('#dnashape').html()
  dna += $('#dnadecoration').html()
  dna += $('#dnadecorationMid').html()
  dna += $('#dnadecorationSides').html()
  dna += $('#dnaanimation').html()
  dna += $('#dnaspecial').html()

  return parseInt(dna)
}

function renderCat(dna){
  headColor(colors[dna.headColor],dna.headColor)
  $('#bodyColor').val(dna.headColor)

  mouthColor(colors[dna.mouthColor],dna.mouthColor)
  $('#mouthColor').val(dna.mouthColor)

  eyesColor(colors[dna.eyesColor],dna.eyesColor)
  $('#eyesColor').val(dna.eyesColor)

  earsColor(colors[dna.earsColor],dna.earsColor)
  $('#earsColor').val(dna.earsColor)

  eyeVariation(dna.eyesShape)
  $('#eyeShape').val(dna.eyesShape)

  markingPattern(dna.decorationPattern)
  $('#markingShape').val(dna.decorationPattern)

  decorationMidColor(colors[dna.decorationMidColor],dna.decorationMidColor)
  $('#decorationMidColor').val(dna.decorationMidColor)

  decorationSidesColor(colors[dna.decorationSidesColor],dna.decorationSidesColor)
  $('#decorationSidesColor').val(dna.decorationSidesColor)
}

// Changing cat colors
$('#bodyColor').change(()=>{
  var colorVal = $('#bodyColor').val()
  headColor(colors[colorVal],colorVal)
})

$('#mouthColor').change(()=>{
  var colorVal = $('#mouthColor').val()
  mouthColor(colors[colorVal],colorVal)
})

$('#eyesColor').change(()=>{
  var colorVal = $('#eyesColor').val()
  eyesColor(colors[colorVal],colorVal)
})

$('#earsColor').change(()=>{
  var colorVal = $('#earsColor').val()
  earsColor(colors[colorVal],colorVal)
})

//changing eye Shape
$('#eyeShape').change(()=>{
  var shape = parseInt($('#eyeShape').val())  //between 1 and 7
  eyeVariation(shape)
})

//changing marking Pattern
$('#markingShape').change(()=>{
  var pattern = parseInt($('#markingShape').val()) //between 0 and 9
  markingPattern(pattern)
})

//changing middle marks color
$('#decorationMidColor').change(()=>{
  var colorVal = $('#decorationMidColor').val()
  decorationMidColor(colors[colorVal],colorVal)
})

// changing side marks color
$('#decorationSidesColor').change(()=>{
  var colorVal = $('#decorationSidesColor').val()
  decorationSidesColor(colors[colorVal],colorVal)
})
