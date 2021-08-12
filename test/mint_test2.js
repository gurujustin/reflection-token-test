
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
  // wallet addresses
  var walletB;
  var walletC;
  var walletD;
  // values for holding larger numbers, to prevent typos
  var oneT = 1000000000000;
  var oneM = 1000000;
  // tokenomics
  var tax = 0.05;
  var distAmnt = 0;

  /****************************************************************************************/
  /* Operations and Settings                                                              */
  /****************************************************************************************/

  it(`1. Fetch total coin supply.`, async function () {

    // Get total token supply(in contract)
    originalSupply = await config.reflect.totalSupply.call({from: config.owner});

    assert.equal(originalSupply, 1000000000000000, "Fetches the total coin supply");

  });

  it(`2. Transfer from owner to walletB`, async function () {

    // Set walletB address
    walletB = config.testAddresses[1];

    // Transfer one trillion coins from owner to walletB 
    await config.reflect.transfer(walletB, oneT, {from: config.owner});
    // Get balance of walletB address
    let BSupply = await config.reflect.balanceOf.call(walletB, {from: config.owner});
    
    assert.equal(BSupply, oneT, "WalletB should contain 1T coins - owner is exempt from taxes");

  });

  it(`3. Transfer from owner to walletC`, async function () {

    // Set walletC address
    walletC = config.testAddresses[2];

    // Transfer one trillion coins from owner to walletC
    await config.reflect.transfer(walletC, oneT, {from: config.owner});
    // Get balance of walletC address
    let CSupply = await config.reflect.balanceOf.call(walletC, {from: config.owner});

    assert.equal(CSupply, oneT, "WalletC should contain 1T coins - owner is exempt from taxes");
  });

  it(`4. Transfer from owner to walletD`, async function () {

    // Set walletC address
    walletD = config.testAddresses[3];

    // Transfer one trillion coins from owner to walletD
    await config.reflect.transfer(walletD, oneT, {from: config.owner});
    // Get balance of walletD address
    let DSupply = await config.reflect.balanceOf.call(walletD, {from: config.owner});

    assert.equal(DSupply, oneT, "WalletD should contain 1T coins - owner is exempt from taxes");
  });
  
  it(`5. Check balance of walletB.`, async function () {

    // Get balance of walletB address
    let BSupply = await config.reflect.balanceOf.call(walletB, {from: config.owner});

    assert.equal(BSupply, oneT, "walletB should contain 1T coins + 0 reflection.  All transfers were from exempt owner");

  });

  /****************************************************************************************/
  /* Test Reflection AFTER Transfers From Owner                                           */
  /****************************************************************************************/


  it(`6. Just checking total supply.`, async function () {

    // Find the total supply
    totalSupply = await config.reflect.totalSupply.call({from: config.owner});

    assert.equal(totalSupply, 1000000000000000, "Total supply should be 1,000,000,000,000,000");
  });

  it(`7. Transfer 1t coins from walletB to walletC`, async function () {

    // Get balance of walletD address BEFORE transfer
    let beforeDSupply = await config.reflect.balanceOf.call(walletD, {from: config.owner});

    // Transfer one trillion coins from walletB to walletC
    // THIS TRANSFER DOES NOT DIRECTLY EFFECT THE BALANCE OF walletD
    await config.reflect.transfer(walletC, oneT, {from: walletB});

    // Logic for storing reflection value
    distAmnt = (oneT * tax);

    // Get balance of walletD address
    let DSupply = await config.reflect.balanceOf.call(walletD, {from: config.owner});
    let ASupply = await config.reflect.balanceOf.call(config.owner, {from: config.owner});
    let BSupply = await config.reflect.balanceOf.call(walletB, {from: config.owner});
    let CSupply = await config.reflect.balanceOf.call(walletC, {from: config.owner});

    console.log('WalletA: ', ASupply.toNumber());
    console.log('WalletB: ', BSupply.toNumber());
    console.log('WalletC: ', CSupply.toNumber());
    console.log('WalletD: ', DSupply.toNumber());

    let sum = ASupply.toNumber() + BSupply.toNumber() + CSupply.toNumber() + DSupply.toNumber();
    console.log('sum: ', sum)
    assert.isAtLeast(totalSupply.toNumber(), sum, "Totalsupply should be greater or equal to sum of 4 wallets");
  
  });

  it(`8. Transfer 1m coins from walletC to walletB`, async function () {

    // Get balance of walletD address BEFORE transfer
    let beforeDSupply = await config.reflect.balanceOf.call(walletD, {from: config.owner});

    // Transfer one trillion coins from walletB to walletC
    // THIS TRANSFER DOES NOT DIRECTLY EFFECT THE BALANCE OF walletD
    await config.reflect.transfer(walletB, oneM, {from: walletC});

    // Logic for storing reflection
    distAmnt = (oneM * tax);

    // Calculate percentage of total supply held by wallet
    let perc = beforeDSupply.toNumber() / totalSupply.toNumber();

    let final = beforeDSupply.toNumber() + (distAmnt * perc);
    console.log(beforeDSupply.toNumber());
    console.log(distAmnt * perc);

    // Get balance of walletD address AFTER transfer
    let DSupply = await config.reflect.balanceOf.call(walletD, {from: config.owner});

    console.log('balance after: ', DSupply.toNumber());

    // Use Math.floor() to simulate Solidity's natural rounding down of decimals
    assert.equal(DSupply, Math.floor(final), "WalletD should contain 1T coins + reflection from B to C transfer");
  
  });

  it(`9. Transfer 1m coins from walletC to walletB - same as previous`, async function () {

    // Get balance of walletD address BEFORE transfer
    let beforeDSupply = await config.reflect.balanceOf.call(walletD, {from: config.owner});

    // Transfer one trillion coins from walletB to walletC
    // THIS TRANSFER DOES NOT DIRECTLY EFFECT THE BALANCE OF walletD
    await config.reflect.transfer(walletB, oneM, {from: walletC});

    // Logic for storing reflection
    distAmnt = (oneM * tax);

    // Calculate percentage of total supply held by wallet
    let perc = beforeDSupply.toNumber() / totalSupply.toNumber();

    let final = beforeDSupply.toNumber() + (distAmnt * perc);
    console.log(beforeDSupply.toNumber());
    console.log(distAmnt * perc);

    // Get balance of walletD address AFTER transfer
    let DSupply = await config.reflect.balanceOf.call(walletD, {from: config.owner});

    console.log('balance after: ', DSupply.toNumber());    

    // Use Math.floor() to simulate Solidity's natural rounding down of decimals
    assert.equal(DSupply, Math.floor(final), "WalletD should contain 1T coins + reflection from B to C transfer");
  
  });

  it(`10. Check sum of all wallets vs. total supply.`, async function () {

    // Get balance of owner address
    let ownerSupply = await config.reflect.balanceOf.call(config.owner, {from: config.owner});
    // Get balance of walletB address
    let BSupply = await config.reflect.balanceOf.call(walletB, {from: config.owner});
    // Get balance of walletC address
    let CSupply = await config.reflect.balanceOf.call(walletC, {from: config.owner});
    // Get balance of walletD address
    let DSupply = await config.reflect.balanceOf.call(walletD, {from: config.owner});

    // Get total token supply(in contract)
    totalSupply = await config.reflect.totalSupply.call({from: config.owner});

    let allWalletSupply = ownerSupply.toNumber() + BSupply.toNumber() + CSupply.toNumber() + DSupply.toNumber();

    console.log('Sum of all wallets: ', allWalletSupply);    
    console.log('Total supply: ', totalSupply.toNumber());  

    // Use Math.floor() to simulate Solidity's natural rounding down of decimals
    assert.isAtLeast(totalSupply.toNumber(), allWalletSupply, "Sum of all wallets should equal total supply.");
  
  });

});