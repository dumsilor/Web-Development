var numpad = document.querySelectorAll(".numButton");
var number = [];
var total_number = [];
var num1 = "";
var num2 = "";
var get = "";
var result = "";

for(i=0;i<numpad.length;i++){
   numpad[i].addEventListener("click",function(){
       var digit = this.innerHTML;
       switch (digit) {
           case "x":
               num1 = total_number;
               number = [];
               get = "multiply"
               break;
            case "+":
                break;
            case "-":
                break;
            case "÷":
                break;
            case "=":
                num2 = total_number;
                switch (get) {
                    case "multiply":
                        result = parseInt(num1) + parseInt(num2)
                        document.querySelector(".scrn").innerHTML = result
                        break;
                
                    default:
                        break;
                }
                break;
           default:
               number.push(digit);
               total_num = number.join("");
               document.querySelector(".scrn").innerHTML = total_number;
               break;
       }
       
   })
}

document.querySelector(".scrn").innerHTML = result