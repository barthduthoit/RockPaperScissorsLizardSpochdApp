pragma solidity ^0.4.24;

contract RockPaperCissors{
    
    address player1;
    address player2;
    
    string player1Move;
    string player2Move;
    
    function isRegistered() public constant returns (bool){
        if ((player1 != msg.sender) && (player2 != msg.sender)){
            return true;
        }
        return false;
    }
    
    function register(){
        if (isRegistered()){
            if (player1 == 0) player1 = msg.sender;
            else if (player2 == 0) player2 = msg.sender;
        }
    }
    
    function makeMove(string move){
        if (msg.sender == player1) player1Move = move;
        else if (msg.sender == player2) player2Move = move;
    }
    
    function getWinner() public constant returns (int) {
        if ((keccak256(player1Move)==keccak256("rock") && keccak256(player2Move)==keccak256("cissors")) || 
            (keccak256(player1Move)==keccak256("paper") && keccak256(player2Move)==keccak256("rock")) || 
            (keccak256(player1Move)==keccak256("cissors") && keccak256(player2Move)==keccak256("paper"))){
            return 1;
        }
        else if (keccak256(player1Move)==keccak256(player2Move)){
            return 0;
        }
        else return 2;
    }
    
    function reset(){
        player1 = 0;
        player2 = 0;
        player1Move = "";
        player2Move = "";
    }
    
    function unroll() public constant returns (int){
        if ((bytes(player2Move).length > 0) && (bytes(player2Move).length > 0)) {
            int winner = getWinner();
            reset();
            return winner;
        }
        
    }
}
