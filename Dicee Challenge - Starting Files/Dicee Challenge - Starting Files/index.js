function randomlDice () {

    var rand = Math.random() * 6;
    var randomNumber = Math.floor(rand)+1
    var fileName = "images/dice"+randomNumber+".png"

    return fileName;
}

var num1 = randomlDice();
var num2 = randomlDice();
document.querySelector(".img1").src = num1;
document.querySelector(".img2").src = num2;

if (num1>num2){
    document.querySelector("h1").innerHTML = "🚩 Player 1 Wins"
} else if (num1===num2){
    document.querySelector("h1").innerHTML = "It's a draw!"
} else {
    document.querySelector("h1").innerHTML = "Player 2 Wins 🚩"
}
