$(".fighter").on("click",function(){

    
    $("#fighterSelect").empty();
    $(this).clone().appendTo(".chosenFighter");
    

});