require("file-loader?name=../index.html!../index.html");
require("file-loader?name=../recognizing_body.html!../recognizing_body.html");
require("file-loader?name=../university.html!../university.html");
require("file-loader?name=../certificate.html!../certificate.html");
const Web3 = require("web3");
const Promise = require("bluebird");
const truffleContract = require("truffle-contract");
const $ = require("jquery");
// Not to forget our built contract
const RecognizingBodyJson = require("../../build/contracts/RecognizingBody.json");

// Supports Mist, and other wallets that provide 'web3'.
if (typeof web3 !== 'undefined') {
    // Use the Mist/wallet/Metamask provider.
    window.web3 = new Web3(web3.currentProvider);
} else {
    // Your preferred fallback.
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); 
}

Promise.promisifyAll(web3.eth, { suffix: "Promise" });
Promise.promisifyAll(web3.version, { suffix: "Promise" });

const RecognizingBody = truffleContract(RecognizingBodyJson);
RecognizingBody.setProvider(web3.currentProvider);

window.addEventListener('load', function() {
    return web3.eth.getAccountsPromise()
        .then(accounts => {
            if (accounts.length == 0) {
                $("#balance").html("N/A");
                throw new Error("No account with which to transact");
            }
            window.account = accounts[0];
            // console.log("ACCOUNT:", window.account);
            return web3.version.getNetworkPromise();
        })
        .then(function(network) {
            return RecognizingBody.deployed();
        })
        .then(deployed => deployed.getBalance.call(window.account))
        .then(balance => $("#balance").html(balance.toString(10)))
        .catch(console.error);
});