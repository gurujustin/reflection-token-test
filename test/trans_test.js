
var Test = require('../config/testConfig.js');
var BigNumber = require('bignumber.js');

contract('REFLECT.sol', async (accounts) => {

  var config;
  before('setup contract', async () => {
    config = await Test.Config(accounts);
  });

    /////////////////////////////////////////////////////////////////////
  // Global setup variables
  var totalSupply;
  var originalSupply;
  var walletSupply;
  // wallet addresses
  var walletB;
  var walletC;
  var walletD;
  var walletE;
  var walletF;
  var walletG;
  // values for holding larger numbers, to prevent typos
  var oneT = 1000000000000;
  var oneM = 1000000;

  /****************************************************************************************/
  /* Operations and Settings                                                              */
  /****************************************************************************************/

  it(`1. Fetch total coin supply.`, async function () {

    // Get total token supply(in contract)
    originalSupply = await config.reflect.totalSupply.call({from: config.owner});

    assert.equal(originalSupply, 1000000000000000, "Fetches the total coin supply");

  });

  it(`2. Transfer 1T from owner to walletB, C, D, E, F, and G`, async function () {

    // Set walletB - G address
    walletB = config.testAddresses[1];
    walletC = config.testAddresses[2];
    walletD = config.testAddresses[3];
    walletE = config.testAddresses[4];
    walletF = config.testAddresses[5];
    walletG = config.testAddresses[6];

    // Transfer one trillion coins from owner to walletB - G
    await config.reflect.transfer(walletB, oneT, {from: config.owner});
    await config.reflect.transfer(walletC, oneT, {from: config.owner});
    await config.reflect.transfer(walletD, oneT, {from: config.owner});
    await config.reflect.transfer(walletE, oneT, {from: config.owner});
    await config.reflect.transfer(walletF, oneT, {from: config.owner});
    await config.reflect.transfer(walletG, oneT, {from: config.owner});

    // Get total balance of walletB - G
    let BSupply = await config.reflect.balanceOf.call(walletB, {from: config.owner});
    let CSupply = await config.reflect.balanceOf.call(walletC, {from: config.owner});
    let DSupply = await config.reflect.balanceOf.call(walletD, {from: config.owner});
    let ESupply = await config.reflect.balanceOf.call(walletE, {from: config.owner});
    let FSupply = await config.reflect.balanceOf.call(walletF, {from: config.owner});
    let GSupply = await config.reflect.balanceOf.call(walletG, {from: config.owner});

    walletSupply = BSupply.toNumber() + CSupply.toNumber() + DSupply.toNumber() + ESupply.toNumber() + FSupply.toNumber() + GSupply.toNumber();
    
    assert.equal(walletSupply, oneT * 6, "Total of all wallets should be 6T");

  });

  /****************************************************************************************/
  /* Test Reflection AFTER Transfers From Owner                                           */
  /****************************************************************************************/

  it(`3. Just checking total supply.`, async function () {

    // Find the total supply
    totalSupply = await config.reflect.totalSupply.call({from: config.owner});

    assert.equal(totalSupply, 1000000000000000, "Total supply should be 1,000,000,000,000,000");
  });

  it(`4. Check sum of all wallets vs. total supply.`, async function () {

    // Get balance of owner address
    let ownerSupply = await config.reflect.balanceOf.call(config.owner, {from: config.owner});
    let BSupply = await config.reflect.balanceOf.call(walletB, {from: config.owner});
    let CSupply = await config.reflect.balanceOf.call(walletC, {from: config.owner});
    let DSupply = await config.reflect.balanceOf.call(walletD, {from: config.owner});
    let ESupply = await config.reflect.balanceOf.call(walletD, {from: config.owner});
    let FSupply = await config.reflect.balanceOf.call(walletD, {from: config.owner});
    let GSupply = await config.reflect.balanceOf.call(walletD, {from: config.owner});

    // Get total token supply(in contract)
    totalSupply = await config.reflect.totalSupply.call({from: config.owner});

    let allWalletSupply = ownerSupply.toNumber() + BSupply.toNumber() + CSupply.toNumber() + DSupply.toNumber() + ESupply.toNumber() + FSupply.toNumber() + GSupply.toNumber();

    console.log('Sum of all wallets: ', allWalletSupply);    
    console.log('Total supply: ', totalSupply.toNumber());  

    // Use Math.floor() to simulate Solidity's natural rounding down of decimals
    assert.equal(totalSupply, Math.floor(allWalletSupply), "Sum of all wallets should equal total supply.");
  
  });

  /****************************************************************************************/
  /* Test Reflection AFTER Transfers Between Non-Exempt Wallets                           */
  /****************************************************************************************/

  it(`5. Transfer 1M from wallet to wallet`, async function () {

    // Array of all wallets EXCLUDING walletG - reserved as a bystander to collect reflection
    var walletArray = [walletB, walletC, walletD, walletE, walletF]
    var senderArray = [walletC, walletD, walletE, walletF, walletG]

//                  V - number of loops through the loop 
    for(i = 0; i < 32; i++) {
        for(j = 0; j < walletArray.length; j++) {
            let addyRecip = walletArray[j];
            let addySender = senderArray[j];
            // Transfer one million coins from owner to walletB - E
            //                                         V - Transaction value
            await config.reflect.transfer(addyRecip, 1000000000, {from: addySender});
        }
    }

    // Get total balance of walletB - G
    let ownerSupply = await config.reflect.balanceOf.call(config.owner, {from: config.owner});
    let BSupply = await config.reflect.balanceOf.call(walletB, {from: config.owner});
    let CSupply = await config.reflect.balanceOf.call(walletC, {from: config.owner});
    let DSupply = await config.reflect.balanceOf.call(walletD, {from: config.owner});
    let ESupply = await config.reflect.balanceOf.call(walletE, {from: config.owner});
    let FSupply = await config.reflect.balanceOf.call(walletF, {from: config.owner});
    let GSupply = await config.reflect.balanceOf.call(walletG, {from: config.owner});

    walletSupply = ownerSupply.toNumber() + BSupply.toNumber() + CSupply.toNumber() + DSupply.toNumber() + ESupply.toNumber() + FSupply.toNumber() + GSupply.toNumber();

    // Get total token supply(in contract)
    totalSupply = await config.reflect.totalSupply.call({from: config.owner});
    console.log('sum of all wallets : ', walletSupply);
    console.log('totalSupply : ', totalSupply.toNumber());
    assert.isAtLeast(totalSupply.toNumber(), walletSupply, "Total of all wallets should equal total supply");

  });

});