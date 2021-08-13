
var REFLECT = artifacts.require("DappToken");
var BigNumber = require('bignumber.js');

var Config = async function(accounts) {
    
    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        "0xD910b921182E1aeD4079c789559599E06208d7bD",
        "0xE20413b6F7B6b966f9990f4D436556d12e13542a",
        "0x34148FEbfD114F00fDb6AB582C8927BB68c8d88B",
        "0x134e436B13b26803fc657F309bDc01854BEAB9dE",
        "0xB6B70A95F72060834B59EBb483EA421EAA628aB2",
        "0x591b898Ce7Dfa9582D7B8cF12a859bC39fFbBC9a",
        "0xB7bfeEe16CBf72C89930672790E9d92d4359a0Dc",
        "0x0517bbf2838FD69167817FF62A31893432F354aF",
        "0x170b22f02291C2e2Cf0D5aF0bb83B53345C85005",
        "0x660b38361874C34D2780B3877792b82267Ec5fba"
    ];


    let owner = accounts[0];

    // Throw constructor data as args in the .new() function
    let reflect = await REFLECT.new();

    return {
        owner: owner,
        reflect: reflect,
        testAddresses: testAddresses,
        // To make smaller transactions easier
        weiMultiple: (new BigNumber(10)).pow(18),
    }
}

module.exports = {
    Config: Config
};