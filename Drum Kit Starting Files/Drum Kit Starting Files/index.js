
letters = ["w","a","s","d","j","k","l"];
for (i=0;i<letters.length;i++) {
   var cls = "." +letters[i];
   document.querySelector(cls).addEventListener("click",function  (){ 
       var innerHtml = this.innerHTML;
       playAudio(innerHtml);
       buttonPressed(innerHtml);
   
    });
}

document.addEventListener("keypress", function (event){
     playAudio(event.key);
     buttonPressed(event.key);
});

function playAudio (key) {
    switch (key) {
           case "w":
               var audio = new Audio("sounds/tom-4.mp3");
               audio.play();
               break;
          case "a":
               var audio = new Audio("sounds/kick-bass.mp3");
               audio.play();
               break;
          case "s":
               var audio = new Audio("sounds/snare.mp3");
               audio.play();
               break;
          case "d":
               var audio = new Audio("sounds/tom-1.mp3");
               audio.play();
               break;
          case "j":
               var audio = new Audio("sounds/tom-2.mp3");
               audio.play();
               break;
          case "k":
               var audio = new Audio("sounds/tom-3.mp3");
               audio.play();
               break;
          case "l":
               var audio = new Audio("sounds/crash.mp3");
               audio.play();
               break;
           default:
               console.log(innerHtml)
               break;
       }
}
//var audio = new Audio("sounds/crash.mp3");
 //      audio.play();


 function buttonPressed(pressed_button) {
     document.querySelector("."+pressed_button).classList.add("pressed");
     setTimeout(function(){
          document.querySelector("."+pressed_button).classList.remove("pressed");
     },100)
}