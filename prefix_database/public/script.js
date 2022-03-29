function hideDiv() {
    var x = document.getElementById("mainForm");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }


function hideDeleteDiv(){
    var id = document.getElementById("1").innerHTML;
    var x = document.getElementById(id);
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
}


//   function delete_confirm(){
//       var id = document.getElementById("getId").innerHTML;
//       var ans = prompt("Do you want to delete the following entry? Type Y to continue and type N to cancel")
//       if (ans==="y" || ans==="Y") {
//           document.getElementById(id).submit();
//       } else {
//           return false;
//       }
//   }


function copy_conf(){
    var copyText = document.querySelector("#config");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    navigator.clipboard.writeText(copyText.value);
    alert("Copied the text: " +  copyText.value);
}