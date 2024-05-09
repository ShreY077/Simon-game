
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];

var Started = false;

var level = 0;

$(document).keypress(function(){

    if (Started){
        $("#level-title").text("level " + level);
        nextSequence();
        Started = true;
    }
});



function nextSequence(){
    level ++;
    $("#level-title").text("level " + level);
    
    var randomNumber = Math.floor((Math.random() * 4));
    console.log(randomNumber);

    var randomChosenColour = buttonColours[randomNumber];

    gamePattern.push(randomChosenColour);

    var selectedButton = $("#" + randomChosenColour);

    selectedButton.animate({opacity:0.5} , 100).animate({opacity:1}, 100);
 
    playSound(randomChosenColour);
    animatePress(randomChosenColour);   
};


$(".btn").on("click", function(){
    var userChosenColour = $(this).attr("id");
    
    userClickedPattern.push(userChosenColour);
    

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
  });


function playSound(name) {
    var audio = new Audio ("sounds/" + name + ".mp3");
    audio.play(); 
};


function animatePress(currentcolour){
    $("#" + currentcolour).addClass("pressed");
    setTimeout(function () {
     $("#" + currentcolour).removeClass("pressed");
    }, 100);
};

function checkAnswer (currentlevel){
 if (userClickedPattern [currentlevel] === gamePattern[currentlevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){

        console.log("user finished there sequence")
    
        setTimeout(function(){
            nextSequence();
            userClickedPattern = [];
        } , 1000);
     } 
 } 
 else {
    console.log("wrong");
    
    var audio = new Audio("sounds/Wrong.mp3")
    audio.play();

    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 200);

    $("#level-title").text("GAME OVER, Press Any Key To Restart");

    startover();

 }};

 function startover(){
    level = 0;
    gamePattern = [];
    Started = false;
 }

