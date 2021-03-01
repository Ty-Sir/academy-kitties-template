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
      $('#eventAlert').modal('show');
      console.log(event);
      let owner = event.returnValues.owner;
      let tokenID = event.returnValues.tokenID;
      let genes = event.returnValues.genes;

      $('.eventAlertText').html("Owner: " + owner + '<br>' + " Kitten ID: " + tokenID + '<br>' + " Genes: " + genes);

    }).on('error', (error, receipt) => console.log(error, receipt));
  });
});

$('#view-in-catalouge').click(function(){
  window.location.href="catalouge.html";
});

$('#make-another-one').click(function(){
  $('#eventAlert').modal('hide');
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
