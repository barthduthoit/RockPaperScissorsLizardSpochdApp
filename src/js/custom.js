$(document).ready(function() {

    $("#start").click(function(){
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
            $(this).css({"background-color": "slategrey"});
        }
        $("#playMenu").find(".move").removeClass("zoom");
        rpsContractInstance.makeMove($(this).attr('id'));
        if (rpsContractInstance.isReady()) {
            rpsContractInstance.unroll();
        }
    });

    function reset(){
        $winner = 0;
        $("#playMenu").hide();
        $("#makeMove").hide();
        $("#replay").parent().hide();
        $("#results").children().hide();
        $("#start").click();
        $("#playMenu").find(".move").addClass("zoom");
        $(".zoom").css("background-color", "");
    }



});