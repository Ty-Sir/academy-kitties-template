let web3 = new Web3(Web3.givenProvider);

let instance;
let user;
let contractAddress = "0x38983a3Cc2C4c1dc52805e7B97709Ed3428E656D";//enter the catcontract address after you migrate

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
    }).on('error', console.error);
  })
});

//close-icon button for created cat alert
function closeIcon(){
  $('#close-icon').click(function(){
    $('#eventAlert').hide();
  });
};

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
