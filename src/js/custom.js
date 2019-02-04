$(document).ready(function() {

    $("#start").click(function(){
        $("#startMenu").hide();
        $("#waitMenu").show();
        rpsContractInstance.register();
    });


    var $winner = 0
    $(".zoom").click(function(){
        if (rpsContractInstance.canMakeMove()) {
            $(this).css({"background-color": "blue"});
        }
        $("#playMenu").find(".move").removeClass("zoom");
        rpsContractInstance.makeMove($(this).attr('id'));
        if (rpsContractInstance.isReady()) {
            rpsContractInstance.unroll();
        }
    });

});