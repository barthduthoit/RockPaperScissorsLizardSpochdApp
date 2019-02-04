var Web3 = require('web3');
var web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));

var rpsContractABI = [
	{
		"constant": false,
		"inputs": [],
		"name": "register",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isRegistered",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "unroll",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "canMakeMove",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getWinner",
		"outputs": [
			{
				"name": "",
				"type": "int256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "move",
				"type": "string"
			}
		],
		"name": "makeMove",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "isReady",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "reset",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "ready",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "winner",
				"type": "int256"
			}
		],
		"name": "unrolled",
		"type": "event"
	}
];

var rpsContract = web3.eth.contract(rpsContractABI);
var rpsContractInstance = rpsContract.at("0x3217a3d7de6c62ee01f8c3039be6779d43921107");

// For testing purposes only
var $me = 1;
web3.eth.defaultAccount = web3.eth.accounts[0];
if (rpsContractInstance.isRegistered()) {
    web3.eth.defaultAccount = web3.eth.accounts[1];
    $me = 2;
}

var readyEvent = rpsContractInstance.ready();
readyEvent.watch(function(error, result){
	if (!error) {
		$("#waitMenu").hide();
		$("#makeMove").show();
		$("#playMenu").show();
	}
	else {
		console.log(error);
	}
});

var unrolledEvent = rpsContractInstance.unrolled();
unrolledEvent.watch(function(error, result){
	if (!error) {
		$winner = result.args.winner;
        if ($winner == $me) {
            $("#win").show();
        }
        else {
            $("#loose").show();
        }
	}
	else {
		console.log(error);
	}
});
