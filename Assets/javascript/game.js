// sets to detect if character and defender are selected
var charSelected = false;
var defendSelected = false;
//empty object to be filled later with selected character and defender
var character = {};
var defender = {};
//enemies defeated
var wins = 0;
//detects if game is over
 var gameOver = false;

//characters

var fighter1 = {
    health: 120,
    baseAttack:8,
    currentAttack:8
};

var fighter2 = {
    health: 100,
    baseAttack:5,
    currentAttack:5
};

var fighter3 = {
    health: 150,
    baseAttack:20,
    currentAttack:20
};

var fighter4 = {
    health: 180,
    baseAttack: 25,
    currentAttack: 25
};

//function to fill character
function chooseCharacter(chosenCharacter){
    character.health = chosenCharacter.health;
    character.baseAttack = chosenCharacter.baseAttack;
    character.currentAttack = chosenCharacter.currentAttack;
    console.log(character);
}

//repeat for defender
function chooseDefender(chosenDefender){
    defender.health = chosenDefender.health;
    defender.baseAttack = chosenDefender.baseAttack;
    defender.currentAttack = chosenDefender.currentAttack;
    console.log(defender);
}

//shift other fighers to Enemies
function moveToEnemies() {
    $(".availableCharacter").removeClass("availableCharacter").addClass("enemy");
    $(".enemy").appendTo($(".enemies"))
  }

  //hide restart button until game is over
  $(".fighterSpot").hide();
  $(".defenderSpan").hide()
  $("#restart").hide();
  $("#attack").hide();

  //Time to determine which character is selected
  //fighter 1
  $(".femaleWarrior").on("click", function(){

    if (charSelected===false) {
        chooseCharacter(fighter1);
        charSelected = true;
        $(".femaleWarrior").removeClass("availableCharacter").addClass("chosenCharacter");
        moveToEnemies();
        $(this).appendTo($(".fighterSelected"));
        console.log("Fighter 1 Chosen");
        $(".fighterSpot").show();
        $(".selected").hide();        
    }
    else if (charSelected === true && defendSelected === false){

        if ($(".femaleWarrior").hasClass("enemy")) {

            chooseDefender(fighter1);
            defendSelected = true;
            $(".femaleWarrior").removeClass("enemy").addClass("defender");
            $(this).appendTo($(".defenderSpan"));
            $(".defenderSpan").show();
            $("#attack").show();
        }
    }

  });

  //fighter 2
  $(".gateWarrior").on("click", function(){

    if (charSelected===false) {
        chooseCharacter(fighter2);
        charSelected = true;
        $(".gateWarrior").removeClass("availableCharacter").addClass("chosenCharacter");
        moveToEnemies();
        $(this).appendTo($(".fighterSelected"));
        console.log("Fighter 2 Chosen");
        $(".fighterSpot").show();
        $(".selected").hide();
        
    }

    else if (charSelected === true && defendSelected === false){

        if ($(".gateWarrior").hasClass("enemy")) {

            chooseDefender(fighter2);
            defendSelected = true;
            $(".gateWarrior").removeClass("enemy").addClass("defender");
            $(this).appendTo($(".defenderSpan"));
            $(".defenderSpan").show();
            $("#attack").show();
        }
    }

  });

  //fighter 3
  $(".oldKnight").on("click", function(){

    if (charSelected===false) {
        chooseCharacter(fighter3);
        charSelected = true;
        $(".oldKnight").removeClass("availableCharacter").addClass("chosenCharacter center-block");
        moveToEnemies();
        $(this).appendTo($(".fighterSelected"));
        console.log("Fighter 3 Chosen");
        $(".fighterSpot").show();
        $(".selected").hide();
    }
    else if (charSelected === true && defendSelected === false){

        if ($(".oldKnight").hasClass("enemy")) {

            chooseDefender(fighter3);
            defendSelected = true;
            $(".oldKnight").removeClass("enemy").addClass("defender");
            $(this).appendTo($(".defenderSpan"));
            $(".defenderSpan").show();
            $("#attack").show();

        }
    }

  });

  $("#restart").on("click", function(){
      location.reload();
  })

  //fighter 4
  $(".boss").on("click", function(){

    if (charSelected===false) {
        chooseCharacter(fighter4);
        charSelected = true;
        $(".boss").removeClass("availableCharacter").addClass("chosenCharacter");
        moveToEnemies();
        $(this).appendTo($(".fighterSelected"));
        console.log("Fighter 4 Chosen");
        $(".fighterSpot").show();
        $(".selected").hide();
    }

    else if (charSelected === true && defendSelected === false){
        if ($(".boss").hasClass("enemy")) {

            chooseDefender(fighter4);
            defendSelected = true;
            $(".boss").removeClass("enemy").addClass("defender");
            $(this).appendTo($(".defenderSpan"));
            $(".defenderSpan").show();
            $("#attack").show();
        }
    }

  });

  //okay character and defender are chosen now to initialize attack!


$("#attack").on("click", function(){
    //only works if there is a chosen character
    if(charSelected===true && defendSelected===true && !gameOver){
        //start with character attack
        //defender damaged by characters base attack
        defender.health = defender.health - character.currentAttack;
        console.log("Defender Health: " + defender.health);
        //character attack power increases by base attack
        character.currentAttack = character.currentAttack + character.baseAttack;
        console.log("Current Attack: " + character.currentAttack)
       //calls back to defender and changes health in text
       $(".defender").find(".health").text(defender.health);
       $(".message").html("<p>You have dealt "   + character.currentAttack +  " damage!</p>")
        
       //sees if defender is dead, then counter attacks
       if (defender.health > 0){
            character.health = character.health - defender.currentAttack;
            $(".chosenCharacter").find(".health").text(character.health);

            if (character.health > 0){
                $(".message").append("<p>They attacked you back for " + defender.baseAttack + " damage.</p>");
            
            }
            else {
                $(".message").append("<p>You have been slain!</p>");
                gameOver = true;
                $("#restart").show();
            }
       }
       else {
        $(".message").append("<p>You have slain you foe. Select another!</p>");
        wins++;           
        defendSelected=false;
        $(".defender").hide();
        console.log(wins);
    }
    if (wins === 3){
        $(".message").append("<p>You've defeated your enemies. Would you like to try again?</p>");
        gameOver= true;
        $("#restart").show();
    }

        
    }

    


});