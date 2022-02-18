setInterval(clock,1000);

function clock(){
    let currentTime = new Date();
    let hour = currentTime.getHours();
    let minute = currentTime.getMinutes();
    let second = currentTime.getSeconds();
    let am_pm = null;
    let weekDay = currentTime.getDay();
    let day = currentTime.getDate();
    let year = currentTime.getFullYear();
    let month = currentTime.getMonth();
    const week_days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let futureTimer = new Date().getTime() + 1.30;
    let curretTimer = new Date().getTime();
  

    if (hour < 12){
        am_pm = "AM";
    } else {
        am_pm = "PM";
    }

    if (hour > 12){
        hour = hour -12;
    }

    hour = hour < 10 ? "0" + hour:hour;
    minute = minute < 10 ? "0" + minute:minute;
    second = second < 10 ? "0" + second:second;
    month = month < 10 ? "0" + month:month;
    day = day < 10 ? "0" + day:day;

    let time = hour + ":" + minute + ":" + second +" " + am_pm;
    let date = week_days[weekDay] +", " +day + "/" + month + "/" + year;
    let subject;
    

    switch(weekDay){
        case 0:
            subject = "Programming";
            break;
        case 2:
            subject= "Cloud";
            break;
        case 4:
            subject= "Data Science";
            break;
        default:
            subject = "Security";
            break;
    }


    document.getElementById("clock").innerHTML = time;
    document.getElementById("date").innerHTML= date;
    document.getElementById("sub").innerHTML = subject;
}

setInterval(timer,1000);

let timerTime = 5400;

function timer(){
    
    timerTime--;
    let hour = Math.floor(timerTime/3600);
    let minute = Math.floor((timerTime % 3600)/60);
    let second = Math.floor((timerTime % 3600) % 60);

    hour = hour < 10 ? "0" + hour:hour;
    minute = minute < 10 ? "0" + minute:minute;
    second = second < 10 ? "0" + second:second;
    let timer = hour + ":" + minute + ":" + second;

    document.getElementById("timer").innerHTML = timer;

}


clock();
timer();