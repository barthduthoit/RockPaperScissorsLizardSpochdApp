$(document).ready(function() {

    var callback  = function(err, result) {if (err) console.log(err)};
    $("#ethAccount").text(web3.eth.accounts[0])
    window.ethereum.on('accountsChanged', function (accounts) {
      $("#ethAccount").text(web3.eth.accounts[0]);
    })



    var callback_args = {from: web3.eth.accounts[0], value: 0, gas: 100000};

    $("#start").click(function(){
        rpsContractInstance.canRegister.call(callback_args,
                                               function(err, result) {
                                                    if (err) {console.log(err)}
                                                    else {
                                                        if (result) {
                                                            console.log("Registering...");
                                                            rpsContractInstance.register(callback_args, callback);
                                                            $("#play").click();
                                                            $("#startMenu").hide();
                                                            $("#waitMenu").show();
                                                        }
                                                        else console.log("Could not register");
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
        rpsContractInstance.canMakeMove.call(callback_args,
                                               function(err, result) {
                                                    if (err) {console.log(err)}
                                                    else {
                                                        if (result) {
                                                            rpsContractInstance.makeMove(moveButton.attr('id'), callback_args, callback);
                                                            moveButton.css({"background-color": "rgb(198,38,65)"});
                                                            $("#playMenu").find(".move").removeClass("zoom");
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