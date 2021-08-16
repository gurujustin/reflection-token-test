
var REFLECT = artifacts.require("DappToken");
var BigNumber = require('bignumber.js');

var Config = async function(accounts) {
    
    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        "0x6132fB0fe2940eC4CeffB4066f6Ce8fe538Ee5d7",
        "0xD0002243c8105fD5a8b8386c2c2fA59638523473",
        "0xfE86DfA649686C9aEF4A3dF56E91947A81584393",
        "0x82559d010cc8253059FD3bCCa75d4b28d2b15bd5",
        "0x0D2e168Abf8D9c533828016C0849481Ea25847A5",
        "0x5C7BF5BB8a67e820fD192De36cc410D4E4eAFa87",
        "0xA8a43C074F37c608cc0B8C3ce6502fcB8a049454",
        "0xA41B8A3F1FA9bCB42b7923Bb9963b7Cf0854C68A",
        "0x33fF967d6f6BFe4d891295ed81b51F9E928Ca868",
        "0x01356E90bC90d4bA34998611FE1Ba5AeBf938B23"
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