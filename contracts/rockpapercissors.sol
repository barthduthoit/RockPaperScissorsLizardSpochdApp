pragma solidity ^0.4.24;

contract RockPaperCissors{
    
    address player1;
    address player2;
    
    string player1Move;
    string player2Move;
    
    event ready();
    event unrolled(int winner);


    function isRegistered() public constant returns (bool){
        if ((player1 == msg.sender) || (player2 == msg.sender)){
            return true;
        }
        return false;
    }

    function register(){
        if  (! isRegistered()){
            if (player1 == 0) player1 = msg.sender;
            else if (player2 == 0) {
                player2 = msg.sender;
                emit ready();
            }
        }
    }

    function canMakeMove() public constant returns (bool){
        if ((msg.sender == player1) && (bytes(player1Move).length == 0)) {
            return true;
        }
        else if ((msg.sender == player2) && (bytes(player2Move).length == 0)) {
            return true;
        }
        return false;
    }

    function makeMove(string move){
        if (canMakeMove()){
            if (msg.sender == player1) player1Move = move;
            else if (msg.sender == player2) player2Move = move;
        }
    }

    function getWinner() public constant returns (int) {
        if ((keccak256(player1Move)==keccak256("rock") && keccak256(player2Move)==keccak256("scissors")) ||
            (keccak256(player1Move)==keccak256("paper") && keccak256(player2Move)==keccak256("rock")) ||
            (keccak256(player1Move)==keccak256("scissors") && keccak256(player2Move)==keccak256("paper"))){
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

    function isReady() public constant returns (bool){
        return ((bytes(player1Move).length > 0) && (bytes(player2Move).length > 0));
    }

    function unroll() public {
        if (isReady()) {
            int winner = getWinner();
            reset();
            emit unrolled(winner);
        }

    }
}