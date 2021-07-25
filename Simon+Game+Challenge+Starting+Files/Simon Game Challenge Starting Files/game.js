var buttonColors = ["blue","green","yellow","red"];
var userClickedPattern = [];
var level = 0
var gamePattern = [];
var started = false;

$("body").keypress(function(){
    if (!started) {
        $("#level-title").text("Level: " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    userChosenColor = $(this).attr("id");
    animatePress(userChosenColor);
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
    
});



function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("Correct"); 
    
        if (userClickedPattern.length === gamePattern.length){  
            setTimeout(function(){
                nextSequence();
            },1000);
            }
    } else {
        console.log("wrong!");
        $("body").addClass("game-over");
        var audio = new Audio ("sounds/wrong.mp3");
        audio.play();
        $("#level-title").text("Game Over");

    }
}



function nextSequence(){
    userClickedPattern = [];
    level ++;
    $("#level-title").text("Level: " + level);
    var randomNumber = Math.floor((Math.random()*4));
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    var i = 0;
    function myloop(){
        setTimeout(function(){
            $("#"+gamePattern[i]).fadeOut(100).fadeIn(100);
            var audio = new Audio ("sounds/"+ gamePattern[i]+".mp3");
            audio.play();
             i++
             if (i < gamePattern.length){
                 myloop();
             }
        }, 500);
    }
    myloop();
}



function playSound(name) {
    var audio = new Audio ("sounds/"+ name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
         $("#" + currentColor).removeClass("pressed");
    },100);
} 

