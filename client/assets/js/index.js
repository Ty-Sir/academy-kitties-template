let web3 = new Web3(Web3.givenProvider);

let instance;
let user;
let contractAddress = "0x815f72E7B1d728A8FD2B64D0891DcB3056f94bcC";//enter the catcontract address after you migrate

$(document).ready(function(){
  window.ethereum.enable().then(function(accounts){
    instance = new web3.eth.Contract(abi, contractAddress, {from: accounts[0]});
    user = accounts[0];

    console.log(instance);

    //emits event on webpage
    instance.events.Birth().on('data', function(event){
      console.log(event);
      let owner = event.returnValues.owner;
      let kittenID = event.returnValues.kittenID;
      let momID = event.returnValues.momID;
      let dadID = event.returnValues.dadID;
      let genes = event.returnValues.genes;
      $('#eventAlert').css("display", "block");
      $('#eventAlert').html("Here is your brand new cat information!"+ '<br>' + '<br>' + "Owner: " + owner + " Kitten ID: " + kittenID + " Mom ID: " + momID + " Dad ID: " + dadID + " Genes: " + genes)
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
  for(i = 0; i < ownedCats.length; i++){
    let cat = await instance.methods.getKitty(ownedCats[i]).call({from:user}, function(error, cat){
      console.log(cat);
    })
  }
};
