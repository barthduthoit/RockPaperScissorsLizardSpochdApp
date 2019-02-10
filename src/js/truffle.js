web3.setProvider(new web3.providers.HttpProvider("https://rinkeby.infura.io"));
ethereum.enable();


$.getJSON("build/contracts/RPSLS.json", function(data) {

    const contractAddress = "0x441f4e488caa5118cc2ec768167f0882199cbc0f";
    const rpsContractABI = data.abi;
    var rpsContract = web3.eth.contract(rpsContractABI);
    window.rpsContractInstance = rpsContract.at(contractAddress);
    
    var readyEvent = window.rpsContractInstance.ready();
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
    
    window.checkMoveEvent_triggered = false;
    var checkMoveEvent = window.rpsContractInstance.checkMove();
    checkMoveEvent.watch(function(error, result){
        if (!error && !window.checkMoveEvent_triggered) {
            window.checkMoveEvent_triggered = true;
            console.log("Checking cheating...")
            var movePassword = window.move+window.password;
            window.rpsContractInstance.isCheating(movePassword, window.move, window.default_transaction_args, window.callback);
        }
        else {
            console.log(error);
        }
    });
    
    
    var $winner = 0;
    var unrolledEvent = window.rpsContractInstance.unrolled();
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
});
