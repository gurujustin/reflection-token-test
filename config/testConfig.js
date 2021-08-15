
var REFLECT = artifacts.require("DappToken");
var BigNumber = require('bignumber.js');

var Config = async function(accounts) {
    
    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        "0x49861B2106dfD276D74aF014f9307666B9241656",
        "0xaEf6a771bC01ce236a59897D95E8d35ecCE40E13",
        "0x48cD993a434Ba479F2E6907627a73E81C285D25b",
        "0x2b2b5e977d1EF93272C7eaC354Bff267263409B3",
        "0x06cadFdE8bd126Dd7b3Fa0025865de3215Dc1e60",
        "0x350BaA0C5eea7Df7C05Ec05CccBb1b490f13ef20",
        "0x67040805E1502560281A1FcF39F333C8aed44b55",
        "0x3dD9462f65415774dcb5F29CbCBe5D7eb1Ab6464",
        "0x577a903375E99Ef44A4540a2e22fE40a8aCba900",
        "0xE7b50300c20eb734441CA1C778d2de727d1bfD95"
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