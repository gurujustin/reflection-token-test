
var REFLECT = artifacts.require("DappToken");
var BigNumber = require('bignumber.js');

var Config = async function(accounts) {
    
    // These test addresses are useful when you need to add
    // multiple users in test scripts
    let testAddresses = [
        "0x7294Af421B9F9a3d89CdfabA83CBDe80209605aE",
        "0x29F6E76e0369a48C0deBf641093974Ed6940C9Ea",
        "0x74c798f287A6658fb669920A6B2E9E1f84c24A3C",
        "0x4703b78a29bCa4Df3d56FfeF6EF3c993BC2bD6b5",
        "0x07e6b53882B098cA41a00432081B6b770D131649",
        "0xA224081a83b2231D5122F529Af5f4063ABaa487c",
        "0x781D7510804e7aF5C75529f1Ef6cA70BCBF6fF9A",
        "0x3208E34518939D38Cb02D5CC46B74F1B863A24f2",
        "0x789be8CCaCF4BF511C5638E5D1896A5EfC505d27",
        "0x50D17B5c0fe6a293E8cb452354232683944461fd"
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