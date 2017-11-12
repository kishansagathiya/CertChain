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
const UniversityJson = require("../../build/contracts/University.json");

// Supports Mist, and other wallets that provide 'web3'.
if (typeof web3 !== 'undefined') {
    console.log('web3');
    window.web3 = new Web3(web3.currentProvider);
} else {
    // Your preferred fallback.
    console.log('No web3? You should consider trying MetaMask!');
    window.web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545')); 
}

Promise.promisifyAll(web3.eth, { suffix: "Promise" });
Promise.promisifyAll(web3.version, { suffix: "Promise" });

const RecognizingBody = truffleContract(RecognizingBodyJson);
RecognizingBody.setProvider(web3.currentProvider);
const University = truffleContract(UniversityJson);
University.setProvider(web3.currentProvider);


window.addEventListener('load', function() {
    return web3.eth.getAccountsPromise()
        .then(accounts => {
            if (accounts.length == 0) {
                //$("#balance").html("N/A");
                throw new Error("No account with which to transact");
            }
            window.account = accounts[0];
            console.log("ACCOUNT:", window.account);
            return web3.version.getNetworkPromise();
        })
        .then(function(){
            $("#addUniversity").click(AddUniversity);
        })
        /*
        .then(function(network) {
            return RecognizingBody.deployed();
        })
        .then(deployed => {
                window.RecognizingBodyDeployed = deployed;
                console.log("CONTRACT ADDRESS:", deployed.address);
        */
                //return deployed.test.call();
                //return deployed.addUniversity.call("0x747da1bee2f226cb41895d2ae8cc511775109109", "NITK Surathkal");
                /*
                window.addEventListener('submit', function(form) {
                        console.log("CONTRACT ADDRESS:", deployed.address);
                        console.log(deployed.test());

                        return deployed.addUniversity.call(form.addressOfUniversity.value, form.nameOfUniversity.value);
                });*/
        /*
                $( "#addUniversity" ).submit(function( event ) {
                    console.log(deployed.test());
                    //university = deployed.addUniversity.call($( "input:addressOfUniversity" ).val(), $( "input:nameOfUniversity" ).val());
                    university = deployed.addUniversity.call("0x747da1bee2f226cb41895d2ae8cc511775109109", "NITK Surathkal");
                    event.preventDefault();
                    return university;
                });
            })
        .then(university => {
            console.log("Address of ContractUniversity:", university)
            $( "span" ).text(university.address).show();
        })
        */
        //.then(university => console.log(university))
        //.then(deployed => deployed.addUniversity.call(window.account))
        //.then(balance => $("#balance").html(balance.toString(10)))
        .catch(console.error);
});

const AddUniversity = function(){
    let deployed;
    return RecognizingBody.deployed()
        .then(_deployed => {
            deployed = _deployed;
            console.log(deployed);
            // .sendTransaction so that we get the txHash immediately.
            return _deployed.addUniversity.call(
                $("input[name='addressOfUniversity']").val(),
                // Giving a string is fine
                $("input[name='nameOfUniversity']").val()
                );
        })
        .then(university => {
            $("#status").html(" University Contract deployed at " + university+" "+ web3.isAddress(university));
        })
        .catch(console.error);
};

