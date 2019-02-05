$(document).ready(function() {

    $("#start").click(function(){
        $("#play").click();
        $("#startMenu").hide();
        $("#waitMenu").show();
        rpsContractInstance.register();
    });

    $("#replay").click(function(){
        reset();
        $("#start").click();
    });


    var $winner = 0
    $(".zoom").click(function(){
        if (rpsContractInstance.canMakeMove()) {
            $(this).css({"background-color": "rgb(198,38,65)"});
        }
        $("#playMenu").find(".move").removeClass("zoom");
        console.log($(this).attr('id'));
        rpsContractInstance.makeMove($(this).attr('id'));
        if (rpsContractInstance.isReady()) {
            rpsContractInstance.unroll();
        }
    });

    function reset(){
        $winner = 0;
        $("#playMenu").hide();
        $("#makeMove").hide();
        $("#replayMenu").hide();
        $("#results").children().hide();
        $("#start").click();
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