pragma solidity ^0.4.24;

contract RPSLS{

    address public player1;
    address public player2;

    // Players moves hashed with a salt
    bytes32 public player1MoveHash;
    bytes32 public player2MoveHash;

    // Hashed moves with not salt
    bytes32 public player1MoveClear;
    bytes32 public player2MoveClear;

    bool public cheatsPlayer1 = true;
    bool public cheatsPlayer2 = true;

    function resetGame() private{
        player1 = 0;
        player2 = 0;
        player1MoveHash = bytes32(0);
        player2MoveHash = bytes32(0);
        player1MoveClear = bytes32(0);
        player2MoveClear = bytes32(0);
        cheatsPlayer1 = true;
        cheatsPlayer2 = true;
    }

    event ready(); //Both players are registered thus to make their move
    event checkMove(); //Both players made their move and are prompted for their password
    event unrolled(address winner); //Both players move check out, so we can get the outcome

    // All the possible hashed moves
    bytes32 rock = keccak256("rock");
    bytes32 paper = keccak256("paper");
    bytes32 scissors = keccak256("scissors");
    bytes32 lizard = keccak256("lizard");
    bytes32 spock = keccak256("spock");


    // Check if a player is already registered
    function isRegistered() public constant returns (bool){
        if ((player1 == msg.sender) || (player2 == msg.sender)) return true;
        return false;
    }

    // Check if a player can register (e.g player1!=0 or player2!=0 and msg.sender is not registered)
    function canRegister() public constant returns (bool){
        if ((player1 == 0) || (player2 == 0) && !isRegistered()) return true;
        return false;
    }

    // Check amount sent
    modifier checkAmount(uint amount){
        require(msg.value >= amount);
        _;
    }

    // Register a player if he is not registred yet and paid enough
    function register() checkAmount(1000000000000000) public payable returns (bool){
        if  (isRegistered()==false){
            if (player1 == 0) {
                player1 = msg.sender;
                return true;
            }
            else if (player2 == 0) {
                player2 = msg.sender;
                emit ready();
                return true;
            }
        }
        return false;
    }

    // Both players are registered
    function playersReady() public constant returns (bool){
        if ((player1 != 0) && (player2 != 0)) return true;
        return false;
    }

    // Check if player can make a move (e.g both players are registered and sender did not play)
    function playersReady_canMakeMove() public constant returns (bool){
        if (playersReady()) {
            if ((msg.sender == player1) && (player1MoveHash == 0)) return true;
            else if ((msg.sender == player2) && (player2MoveHash == 0)) return true;
        }
        return false;
    }

    // Stores and hashes the concatenation of the move and the password
    function makeMove(string movePassword) public {
        if (playersReady()) {
            if ((msg.sender == player1) && (player1MoveHash == 0)){
                player1MoveHash = keccak256(abi.encodePacked(movePassword));
                if (moveFinished()) emit checkMove();
            }
            else if ((msg.sender == player2) && (player2MoveHash == 0)) {
                player2MoveHash = keccak256(abi.encodePacked(movePassword));
                if (moveFinished()) emit checkMove();
            }
        }
    }

    function getWinner() public constant returns (int) {
        // Player 1 rock wins
        if (player1MoveClear==rock && (player2MoveClear==scissors || player2MoveClear==lizard)) {
            return 1;
        }
        // Player 1 paper wins
        else if (player1MoveClear==paper && (player2MoveClear==rock || player2MoveClear==spock)) {
            return 1;
        }
        // Player 1 scissors wins
        else if (player1MoveClear==scissors && (player2MoveClear==paper || player2MoveClear==lizard)) {
            return 1;
        }
        // Player 1 spock wins
        else if (player1MoveClear==spock && (player2MoveClear==scissors || player2MoveClear==rock)) {
            return 1;
        }
        // Player 1 lizard wins
        else if (player1MoveClear==lizard && (player2MoveClear==paper || player2MoveClear==spock)) {
            return 1;
        }
        // Draw
        else if (player1MoveClear==player2MoveClear){
            return 0;
        }
        // Player 2 wins
        else return 2;
    }

    // Both player made their move
    function moveFinished() public constant returns (bool){
        return ((player1MoveHash != 0) && (player2MoveHash != 0));
    }

    // Check if a player is cheating (called after both players made their move)
    function isCheating(string movePassword, string move) public {
        if (msg.sender == player1) {
            cheatsPlayer1 = !(keccak256(abi.encodePacked(movePassword)) == player1MoveHash);
            player1MoveClear = keccak256(abi.encodePacked(move));
        }
        else if (msg.sender == player2) {
            cheatsPlayer2 = !(keccak256(abi.encodePacked(movePassword)) == player2MoveHash);
            player2MoveClear = keccak256(abi.encodePacked(move));
        }
        unroll();
    }

    // Both player revealed their move and did not cheat
    function isUnrollReady() public constant returns(bool){
        return (!cheatsPlayer1 && !cheatsPlayer2);
    }

    function unroll() private {
        if (isUnrollReady()){
            int winner = getWinner();
            if (winner==1) {
                player1.transfer(address(this).balance);
                emit unrolled(player1);
            }
            else if (winner==2) {
                player2.transfer(address(this).balance);
                emit unrolled(player2);
            }
            else {
                player1.transfer(address(this).balance/2);
                player2.transfer(address(this).balance);
                emit unrolled(0);
            }
            resetGame();
        }
    }
}