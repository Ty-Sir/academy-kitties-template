//message to user when no cats are available to display
$(document).ready(function(){
  if($('.catDivs').is(':empty')){
    let textIfNoCats = "<p class='noCatText shadow'>Uh-oh...you don't have any cats! 🙀<br><a href='factory.html'>Make some here!</a></p>"
    $('.catDivs').append(textIfNoCats).css('height', '70vh');
    $('.noCatText').css({'font-size': '20px', 'text-align': 'center', 'transform': 'translateY(20%)', 'padding': '8em 2em', 'margin': 'auto', 'width': '50%', 'background': '#eee', 'border-radius': '15px'});
  };
});

//time allowed for async func to load - wouldn't work without
//right now info only in console
setTimeout(function(){
  getCats();
},100);
