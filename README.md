# Overview
This dapp is inspired by [CryptoKitties](https://www.cryptokitties.co/) and built using a template provided by the [Ivan On Tech](https://academy.ivanontech.com/) Blockchain Developer Bootcamp. A dapp is a decentralised application with a frontend interface and smart contract backend, in this case written in Solidity for use on Ethereum. A user can create, breed, collect, buy, and sell unique digital cats based on the ERC-721 standard.

# Changes To Template
The initial project only allowed the owner of `CatContract.sol` to create generation zero cats. This has been modified to let any user create a generation zero cat until 30 total are made. Generation zero cats can only be made on the factory page, once the 30 generation zero limit has been reached all other cats can only be made through breeding two together on the breed page. There is no limit as to how many can be made this way.

Each cat has a set of numbers (genes) which correlate to 80 possible colors, 7 eye shapes, 10 marking patterns, 7 animations, and 10 backgrounds accompanying the cat. When breeding, 9 extra colors that can not be found using the factory to create a cat can be unlocked at random. If two cats are bred successfully and the resulting cat contains one of these 9 extra colors, they will be highlighted in yellow and have a large rare DNA badge overhead.

# Installation
Here are the steps to run this dapp locally:

Use the package manager [npm](https://www.npmjs.com/) to install Truffle.

```
npm install -g truffle
```

Download [Ganache](https://www.trufflesuite.com/ganache) to run a local blockchain.

Once the truffle-config.js file is added to Ganache and the chain is ready to run, get into the academy-kitties-template root directory in your command line and run:
```
truffle migrate
```
After migration, place the correct contract address between the quotation marks of the empty strings assigned to each of the contract address variables found in the first few lines of these files: `factory.js`, `breed.js`, `catalouge.js`, `marketplaceSell.js`, `marketplaceBuy.js`

Follow the steps in [this video](https://www.youtube.com/watch?v=nUEBAS5r4Og) to connect your MetaMask wallet to your local Ganache blockchain so you can simulate users.

Once successfully added you can now simulate users interacting with this dapp locally! 🐱

# License
[MIT](https://github.com/Ty-Sir/academy-kitties-template/blob/master/LICENSE)
