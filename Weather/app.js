const express = require('express');
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html")
    
});

app.post("/",function(req, res){
    var query = req.body.cityName;
    var key = "0cdc5fc422b1d4661a1085648fc44511";
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+query+"&appid="+key+"&units=metric";
    https.get(url, function(response){
        console.log(response.statusCode);
        response.on("data",function(data){
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const tempFeelsLike = weatherData.main.feels_like;
            const tempDesc = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = " http://openweathermap.org/img/wn/"+icon+"@2x.png"
            res.write("<h1>Current temperature is " + temp + "C in "+query+"</h1>");
            res.write("<p>\nFeels Like: " + tempFeelsLike +"C.</p>");
            res.write("<p>\nDescription: " + tempDesc +".</p>");
            res.write("<img src='"+imageURL+"' alt='Weather Icon'/>");
            res.send();
        });
    });
});

app.listen(3000,function(){
    console.log("Server has started");
});