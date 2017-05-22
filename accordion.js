$(document).ready(function(){
 
    activeItem = $("#accordion li:first");
    $(activeItem).addClass('active');
 
    $("#accordion li").click(function(){
        $(activeItem).animate({width: "3.9vw"}, {duration:300, queue:false});
        $(this).animate({width: "84vw"}, {duration:300, queue:false});
        activeItem = this;
    }); 
});