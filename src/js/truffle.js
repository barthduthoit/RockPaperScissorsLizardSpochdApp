// var Web3 = require('web3');
//var web3 = new Web3();
//web3.setProvider(new web3.providers.HttpProvider("http://localhost:8545"));
web3.setProvider(new web3.providers.HttpProvider("https://rinkeby.infura.io"));
ethereum.enable();

var rpsContractABI = [
	{
		"constant": false,
		"inputs": [],
		"name": "register",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
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
		"constant": true,
		"inputs": [],
		"name": "isUnrollReady",
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
		"name": "canRegister",
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
		"name": "player2",
		"outputs": [
			{
				"name": "",
				"type": "address"
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
		"constant": false,
		"inputs": [],
		"name": "resetGame",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "player1",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
				"type": "address"
			}
		],
		"name": "unrolled",
		"type": "event"
	}
];

var rpsContract = web3.eth.contract(rpsContractABI);

var rpsContractInstance = rpsContract.at("0xaa4b91ac3cfcbe47730c0ceba4ff2a48f5b09026");

// For testing purposes only
//var $me = 1;
//web3.eth.defaultAccount = web3.eth.accounts[0];
//if (rpsContractInstance.isRegistered()) {
//    web3.eth.defaultAccount = web3.eth.accounts[1];
//    $me = 2;
//}


// Deployment
function isInstalled() {
   if (typeof web3 !== 'undefined'){
      console.log('MetaMask is installed')
   }
   else{
      console.log('MetaMask is not installed')
   }
}

function isLocked() {
   web3.eth.getAccounts(function(err, accounts){
      if (err != null) {
         console.log(err)
      }
      else if (accounts.length === 0) {
         console.log('MetaMask is locked')
      }
      else {
         console.log('MetaMask is unlocked')
      }
   });
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

var $winner = 0;
var unrolledEvent = rpsContractInstance.unrolled();
unrolledEvent.watch(function(error, result){
	if (!error) {
		$winner = result.args.winner;
		$("#waitMenuResults").hide();
        if ($winner == web3.eth.defaultAccount) {
            $("#win").show();
        }
        else if ($winner == 0){
            $("#draw").show();
        }
        else {
            $("#loose").show();
        }
        $("#replayMenu").show();
	}
	else {
		console.log(error);
	}
});
