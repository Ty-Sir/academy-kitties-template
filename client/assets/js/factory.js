let web3 = new Web3(Web3.givenProvider);

let catContractInstance;
let user;
let catContractAddress = "";//enter contract here after migration

$(document).ready(function(){
  window.ethereum.enable().then(function(accounts){
    catContractInstance = new web3.eth.Contract(abi.CatContract, catContractAddress, {from: accounts[0]});
    user = accounts[0];
    openingModals();

    console.log(catContractInstance);

    //emits event on webpage
    catContractInstance.events.Birth().on('data', function(event){
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
    }).on('error', (error, receipt) => console.log(error, receipt));
  })

});

async function openingModals(){
  try{
    let gen0Created = await catContractInstance.methods.gen0Counter().call();
    console.log(gen0Created);

    if(gen0Created < 1){
      $('#howManyCatsLeftToMake').html("So far " + gen0Created + " cats have been made.")
    }else if(gen0Created == 1){
      $('#howManyCatsLeftToMake').html("So far " + gen0Created + " cat has been made.")
    }else{
      $('#howManyCatsLeftToMake').html("So far " + gen0Created + " cats have been made.")
    };

    if(gen0Created < 30){
      $('#openingModal').modal('show');
    } else{
      $('#ifAllCatsMade').modal('show');
    }
  } catch(err){
    console.log(err);
  }
};

$('#continueBtn').click(function(){
  $('#openingModal').modal('hide');
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
  catContractInstance.methods.createGen0Cat(dnaStr).send({}, function(error, txHash){
    if(error)
      console.log(error);
    else
      console.log(txHash);
      console.log(dnaStr);
  });
});
