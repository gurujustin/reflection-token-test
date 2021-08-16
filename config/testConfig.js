
var REFLECT = artifacts.require("DappToken");
var BigNumber = require('bignumber.js');

var Config = async function(accounts) {
    
    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        "0xf7f392504d1449db32B341FED626E411E1015E06",
        "0x9c553c7F63dE22E46B423c18917De4db74B0A8A9",
        "0x2Acb731BCB1162F7a1f6CD0A4Fe627A3d6943904",
        "0x56f7565A1478575b89458A30EF8f562C0Db029A2",
        "0x034b81c87190d540a9e6F78c9BacFB84CF586d78",
        "0xdD80Aa9fEBDFFE2d9046c388A4E99f05Fd64cD6D",
        "0x9d4809fadbC84DAc97f00850D6B94aa47A77521C",
        "0x5E7B7B4cA5F4092c0A54E25aE4357045c2ba65f4",
        "0x8fD55af404F6d2A7873A11019f1AE76E871Ea4AD",
        "0x40Ccf12120e66d014090e8cc4e569A9918ab71d9"
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