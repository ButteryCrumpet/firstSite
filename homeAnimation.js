$(document).ready(function(){
    $("#mreInfo").hide();
    var moved = false;
    $("#info").click(function(){
        $("#vid").fadeOut("slow",function(){
            $("#logo").animate({top: "+=30vh"}, 1000, function(){
                $("#logo").fadeOut("slow", function(){
                    $("#mreInfo").fadeIn();
                    moved = true;
                });
            });
        });
        $("#info").fadeOut("slow");
    });
    
    $("#exit").click(function(){
        $("#mreInfo").fadeOut("slow",function(){
            $("#logo").fadeIn("slow", function(){
                $("#logo").animate({top: "-=30vh"}, 1000, function(){
                    $("#vid").fadeIn("slow");
                    $("#info").fadeIn("slow");
                });
            });
        });
    });
});