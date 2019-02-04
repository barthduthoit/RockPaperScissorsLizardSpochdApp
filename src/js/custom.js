$(document).ready(function() {

    $("#start").click(function(){
        rpsContractInstance.register();
    });


    var $winner = 0
    $(".zoom").click(function(){
        rpsContractInstance.makeMove($(this).attr('id'));
        if (rpsContractInstance.isReady()) {
            $winner = rpsContractInstance.unroll().c[0];
            if ($winner == $me) {
                $("#win").show();
            }
            else {
                $("#loose").show();
            }
        }
    });

});