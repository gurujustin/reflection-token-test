
var Test = require('../config/testConfig.js');
var BigNumber = require('bignumber.js');

contract('REFLECT.sol', async (accounts) => {

  var config;
  before('setup contract', async () => {
    config = await Test.Config(accounts);
  });

  /////////////////////////////////////////////////////////////////////
  // Global setup variables
  var ownerSupply;
  var getTotalSupply

  /****************************************************************************************/
  /* Operations and Settings                                                              */
  /****************************************************************************************/

  it(`1. Just to make sure this works...`, async function () {

    // Get token name
    let getName = await config.reflect.name.call({from: config.owner});
    assert.equal(getName, "DApp Token", "Fetches name of coin from contract");

  });

  it(`2. Check total supply.`, async function () {

    // Get total token supply(in contract)
    getTotalSupply = await config.reflect.totalSupply.call({from: config.owner});
    // Total supply should be 1 quadrillion, or 1,000,000,000,000,000
    assert.equal(getTotalSupply, 1000000000000000, "Fetches the total coin supply");

  });

  it(`3. Check balance of owner wallet(address[0])`, async function () {

    // Get balance of owner address
    ownerSupply = await config.reflect.balanceOf.call(config.owner, {from: config.owner});
    // Owner balance should be 1 quadrillion, or 1,000,000,000,000,000
    assert.equal(ownerSupply, 1000000000000000, "Owner wallet owns 100% of all tokens");

  });

  it(`4. Send 50% of tokens to testAddresses[1](Wallet B), and 10% of tokens to testAddresses[2](Wallet C)`, async function () {

    // Find 50% of owner's total balance
    let sixtyPercent = getTotalSupply * 0.6;
    let twentyPercent = getTotalSupply * 0.2;
    // Send 60% of owner's tokens to testAddresses[1]
    await config.reflect.transfer(config.testAddresses[1], sixtyPercent, {from: config.owner});
    // Send 20% of total tokens to testAddresses[1]
    await config.reflect.transfer(config.testAddresses[2], twentyPercent, {from: config.testAddresses[1]});
    
    let bSupply = await config.reflect.balanceOf.call(config.testAddresses[1], {from: config.owner});
    // Wallet B's new balance
    console.log(bSupply.toString())
    assert.equal(bSupply, 404000000000000, "B balance is 40% (+reflection)");

  });

  it(`5. Check testAccount[2](Wallet C)'s balance`, async function () {

    // Check testAddresses[2] balance    
    let cSupply = await config.reflect.balanceOf.call(config.testAddresses[2], {from: config.owner});
    // Wallet C's new balance
    console.log(cSupply.toString())
    assert.equal(cSupply, 191900000000000, "C balance is 20% (less 5%)");
  });

  it(`6. Check that owner recieved reflection`, async function () {

    // Get balance of owner address
    ownerSupply = await config.reflect.balanceOf.call(config.owner, {from: config.owner});
    // owner's new balance
    console.log(ownerSupply.toString())
    assert.equal(ownerSupply, 404000000000000, "Owner balance is 40% (+reflection)");

  });
  
});
