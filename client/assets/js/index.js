let web3 = new Web3(Web3.givenProvider);

let instance;
let user;
let contractAddress = "0x927042D5FD16c612d23C82d7200Fa4E3426307Cc";//enter the catcontract address after you migrate

$(document).ready(function(){
  window.ethereum.enable().then(function(accounts){
    instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
    user = accounts[0];

    console.log(instance);

    //emits event on webpage
    instance.events.Birth().on('data', function(event){
      console.log(event);
      let owner = event.returnValues.owner;
      let tokenID = event.returnValues.tokenID;
      let momID = event.returnValues.momID;
      let dadID = event.returnValues.dadID;
      let genes = event.returnValues.genes;
      $('#eventAlert').css("display", "block");
      $('#eventAlert').html("Here is your brand new cat information!"+
                            '<br>' +
                            "Click " + '<a href="catalouge.html">here</a>' + " to see your cat!" +
                            '<br>' + '<br>' +
                            "Owner: " + owner +
                            " Kitten ID: " + tokenID +
                            " Mom ID: " + momID +
                            " Dad ID: " + dadID +
                            " Genes: " + genes)
    }).on('error', console.error);
  })
});

//create cat button
$('#createKitty').click(function(){
  let dnaStr = getDna();
  instance.methods.createGen0Cat(dnaStr).send({}, function(error, txHash){
    if(error)
      console.log(error);
    else
      console.log(txHash);
      console.log(dnaStr);
  })
});

//15sec timer till event alert disappears
$('#createKitty').click(function(){
  setTimeout(function(){
    $('#eventAlert').fadeOut().empty();
  },15000);
});

//needs to be async otherwise ownedCats will be one behind
async function getCats(){
  let ownedCats = await instance.methods.getMyCats(user).call({from:user}, function(error, tokenID){
    console.log(tokenID);
  })

    //message when no cats are owned
    if(ownedCats.length === 0){
      let textIfNoCats = "<p class='noCatText shadow'>Uh-oh...you don't have any cats! 🙀<br> <a href='factory.html'><button type='button' id='makeSomeHereBtn'>Make Some Here!</button></a></p>"
      $('.catDivs').append(textIfNoCats).css('height', '70vh');
      $('.noCatText').css({'font-size': '20px', 'text-align': 'center', 'transform': 'translateY(-20%)', 'padding': '8em 2em', 'margin': 'auto', 'width': '50%', 'background': '#eee', 'border-radius': '15px'});
    }

    //blinking arrow to show to scroll down
    if(ownedCats.length > 3){
      $('#top-arrow').addClass('top-arrow-animation');
      $('#bottom-arrow').addClass('bottom-arrow-animation');
    }

  for(i = 0; i < ownedCats.length; i++){
    let cat = await instance.methods.getKitty(ownedCats[i]).call({from:user}, function(error, cat){
    addCat(cat[1], i)
    })
    console.log(cat);
  }
};
