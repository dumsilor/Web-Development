import React from "react";

function Footer(){
    var datetime = new Date();
    let year = datetime.getFullYear() 
    return (<footer><p>Copyright @ {year}</p></footer>)
}

export default Footer;