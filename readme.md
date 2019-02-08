A rock paper scissors lizard spock implementation relying on the blockchain with a UI.
Have a look at the demonstration:
![](img/demo.gif)

## Instructions

#### Requirements
No requirements needed, but a way to run a local server such as:
```
$ php -S localhost:8080
```

#### Deploying the smart contract
The smart contract needs to be deployed, either using [Truffle](https://truffleframework.com/) or 
[Remix](http://remix.ethereum.org). You then need to change the smart contract address in *src/js/truffle* 
by setting **contractAddress** to that of the deployed contract.

## About the smart contract
The smart contract only allows two players to play at a time and secures the players' moves through a commit and 
reveal scheme.