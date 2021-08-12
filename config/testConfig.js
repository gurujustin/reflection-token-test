
var REFLECT = artifacts.require("DappToken");
var BigNumber = require('bignumber.js');

var Config = async function(accounts) {
    
    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        "0xA19FA14B614f1A0428fABb872dC025746d193104",
        "0x9b624A746aa3B47b8cE443E8172DeBd0535D4bfD",
        "0xa63c04725d78D0e385F0D07D5289e559B8C16863",
        "0x2896b1EA398a84dC6F73586114F4711b638629df",
        "0x591c836E99edB8A326E12fC9014ae4a7F65BDDcE",
        "0x7e64A8525CD1a06a545c732F026fb401984EadAe",
        "0x48f200f2966CB813075d617CF2e26380EB501B85",
        "0x40A1e5dbfC91ac01776Fa4AE1D93192217525e90",
        "0x855e33cAa9eF8fF16933c7ee3a0C4b934eCeCDae",
        "0x66698C1DafA7825f2eDfB635B784175Eb266Ec42"
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