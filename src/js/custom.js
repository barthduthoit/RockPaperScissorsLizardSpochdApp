$(document).ready(function() {

    window.default_transaction_args = {from: web3.eth.accounts[0], value: 0, gas: 100000};
    window.register_transaction_args = {from: web3.eth.accounts[0], value: 1000000000000001, gas: 100000};
    window.callback  = function(err, result) {if (err) console.log(err)};
    $("#ethAccount").text(web3.eth.accounts[0])
    window.ethereum.on('accountsChanged', function (accounts) {
      $("#ethAccount").text(web3.eth.accounts[0]);
    })



    $("#start").click(function(){
        window.rpsContractInstance.canRegister.call(window.default_transaction_args,
                                               function(err, result) {
                                                    if (err) {console.log(err)}
                                                    else {
                                                        if (result) {
                                                            console.log("Registering...");
                                                            window.rpsContractInstance.register(window.register_transaction_args, window.callback);
                                                            $("#play").click();
                                                            $("#startMenu").hide();
                                                            $("#waitMenu").show();
                                                        }
                                                        else {
                                                            console.log("Could not register") ;
                                                            console.log(err);
                                                        }
                                                    }
                                               });

    });

    $("#replay").click(function(){
        reset();
        $("#start").click();
    });



    var $winner = 0
    $(".zoom").click(function(){
        var moveButton = $(this);
        window.move = moveButton.attr('id');
        window.rpsContractInstance.playersReady_canMakeMove.call(window.default_transaction_args,
                                               function(err, result) {
                                                    if (err) {console.log(err)}
                                                    else {
                                                        if (result) {
                                                            window.password = Math.random().toString(36).substr(2);
                                                            window.rpsContractInstance.makeMove(window.move+window.password, window.default_transaction_args, window.callback);
                                                            moveButton.css({"background-color": "rgb(198,38,65)"});
                                                            $("#playMenu").find(".move").removeClass("zoom");
                                                            console.log(window.password+window.move)
                                                            $("#waitMenuResults").show();
                                                        }
                                                        else console.log("Cannot make a move");
                                                    }
                                               });
    });

    function reset(){
        $winner = 0;
        $("#playMenu").hide();
        $("#makeMove").hide();
        $("#replayMenu").hide();
        $("#results").children().hide();
        $("#playMenu").find(".move").addClass("zoom");
        $(".zoom").css("background-color", "");
        window.checkMoveEvent_triggered = false;
    }

    LeftCol = [["scissors" ,"cuts" ,"paper"],
                ["paper", "covers", "rock"],
                ["rock", "crushes", "lizard"],
                ["lizard", "poisons", "spock"],
                ["spock", "smashes", "scissors"]]
    RightCol = [["scissors", "decapitates", "lizard"],
                ["lizard", "eats", "paper"],
                ["paper", "disproves", "spock"],
                ["spock", "vaporizes", "rock"],
                ["rock", "crushes", "scissors"]]


    function makeCol(arr){
        var html_gen =  ""
        html_gen += "<div class='col-6'>";
        html_gen += "   <div class='row' style='margin-top:8%'>";
        html_gen += "       <div class='col-4 my-auto'>";
        html_gen += "               <img src='src/img/rps/" + arr[0] + ".png' alt='" + arr[0] + "' class='img_rules'>";
        html_gen += "       </div>";
        html_gen += "       <div class='col-2 my-auto' >";
        html_gen += "           <h4>" + arr[1] + "</h4>";
        html_gen += "       </div>";
        html_gen += "       <div class='col-5 my-auto' style='text-align:right'>";
        html_gen += "               <img src='src/img/rps/" + arr[2] + ".png' alt='" + arr[2] + "' class='img_rules'>";
        html_gen += "       </div>";
        html_gen += "   </div>";
        html_gen += "</div>";
        return html_gen
    }

    for (i = 0; i < 5; i++) {
            html_left = makeCol(LeftCol[i]);
            html_right = makeCol(RightCol[i]);
            $("#rulesMenu").children(".row").first().append(html_left + html_right);
        }

    $("#rules").click(function(){
        $("#gameMenu").hide();
        $("#rulesMenu").show();
    });

    $("#play").click(function(){
        $("#rulesMenu").hide();
        $("#gameMenu").show();
    });

});