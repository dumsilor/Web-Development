
function date(){
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

  
    shift = shift_check(hour);
    console.log(hour)
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
    
    return {date, time, shift}
    
    
}

function shift_check(hour){
    let shift;
    if (hour >= 7  && hour <15){
        return shift = "Morning";
    } else if (hour >= 15 && hour < 22){
        return shift = "Evening";
    } else {
        return shift = "Night";
    }

}

const dateObject = date();
const dateValue = dateObject.date;
const time = dateObject.time;
const shiftValue = dateObject.shift;
const dateTime = time + " " + dateValue;
const dateTimeShift = time + " " + dateValue + ", " + shiftValue;


document.getElementById("idate").value = dateValue;
document.getElementById("SCdate").value = dateTime;
document.getElementById("LSdate").value = dateTime;
document.getElementById("bbDate").value = dateTime;
document.getElementById("fuDate").value = dateTime;
document.getElementById("scLastUpdateDate").value = dateTimeShift;
document.getElementById("lsLastUpdateDate").value = dateTimeShift;
document.getElementById("updateHeader").innerHTML = "Shift Update || Date: " + dateValue;