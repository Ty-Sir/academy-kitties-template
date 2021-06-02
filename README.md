# Overview
This is a [Crypto Kitties](https://www.cryptokitties.co/) based clone built using a template given by [Ivan On Tech's](https://academy.ivanontech.com/) blockchain dev bootcamp course. A user can create, breed, collect, buy, and sell unique digital cats based on the ERC-721 standard.

# Changes To Template
The initial project only allowed the owner of `CatContract.sol` to create generation zero cats, but to allow a more open environment I removed the `onlyOwner` modifier. This now lets any user create a generation zero cat until 30 total are made. After that all new cats are made through breeding in the breed page. There is no limit as to how many can be made this way.

In addition to the original template, rare DNA numbers can be gained through breeding two cats. The numbers in the gene strand correlates to a color in the "factory" and range from 10-89. When breeding, the numbers 90-98 are able to be given to the cat resulting in colors not able to be seen otherwise. When successfully created, the cats containing rare DNA will be highlighted in yellow and have a large rare DNA badge overhead the cat.

# Installation
Here are the steps to run this dapp locally:

Use the package manager [npm](https://www.npmjs.com/) to install Truffle.

```
npm install -g truffle
```

Download [Ganache](https://www.trufflesuite.com/ganache) to run a local blockchain.

Once the truffle-config.js file is added to Ganache and the chain is ready to run, get into the academy-kitties-template root directory file in your command line and run:
```
truffle migrate
```
Place the correct contract address in the proper empty variable spot in `factory.js`, `breed.js`, `catalouge.js`, `marketplaceSell.js`, and `marketplaceBuy.js` found in the first few lines.

Follow the steps in [this video](https://www.youtube.com/watch?v=nUEBAS5r4Og) to connect your MetaMask wallet to your local Ganache blockchain so you can simulate users.

Once successfully added you can now simulate users interacting with this dapp locally! 🐱

# License
[MIT](https://choosealicense.com/licenses/mit/)
