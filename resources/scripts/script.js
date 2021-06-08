
const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun","Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const weekNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const apiKey = "d622919847961a1831d9f1eadec9225c";

function startTimer(){
    var refresh=1000; // Refresh rate in milli seconds
    mytime=setTimeout('displayTime()',refresh)
}

function displayTime() {

    let dateObj = new Date();
    let hour = dateObj.getHours();
    let min = dateObj.getMinutes();
    let secs = dateObj.getSeconds();
    let week = weekNames[dateObj.getDay()];
    let date = dateObj.getDate();
    let month = monthNames[dateObj.getMonth()];
    let year = dateObj.getFullYear().toString().substr(-2);

    let presentDate = hour + ":" + min + "-" + week + ", " + date + " " + month + " '" + year;
    document.getElementById("time").innerHTML = presentDate;
    startTimer();
}

function serachCity() {
    let city = document.getElementById("search").value;
    weatherData(city);
}

function cityMumbai() {
    let city = document.getElementById("mumbai").innerHTML;
    weatherData(city);
}

function cityBangalore() {
    let city = document.getElementById("bangalore").innerHTML;
    weatherData(city);
}

function cityHyderabad() {
    let city = document.getElementById("hyderabad").innerHTML;
    weatherData(city);
}

function cityAmaravati() {
    let city = document.getElementById("amaravati").innerHTML;
    weatherData(city);
}

function weatherData(city) {
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+city+'&mode=json&units=metric&appid='+apiKey+'')
    .then(response => response.json())
    .then((data) => {

        let tempValue = data.main.temp;
        let placeValue = data.name;
        let descValue = data.weather[0]['main'];
        let cloudData = data.clouds.all;
        let humidityData = data.main.humidity;
        let windData = data.wind.speed;
        // const rain = data.rain;
        // console.log(rain);

        console.log(data);

        document.getElementById("temp").innerHTML = Math.round(tempValue);
        document.getElementById("place").innerHTML = placeValue.toString();
        document.getElementById("desc").innerHTML = descValue;
        document.getElementById("cloud-data").innerHTML = cloudData + "%";
        document.getElementById("humidity-data").innerHTML = humidityData + "%";
        document.getElementById("wind-data").innerHTML = windData + "m/s";

        if (tempValue >= 34) {
            document.getElementById("weather-icon").src = "https://img.icons8.com/emoji/48/000000/sun-behind-small-cloud.png";
            document.getElementById("main").style.backgroundImage = "url('./resources/images/background.jpg')";
        }
        else if(tempValue >= 26) {
            document.getElementById("weather-icon").src = "https://img.icons8.com/dusk/64/000000/partly-cloudy-day--v1.png";
            document.getElementById("main").style.backgroundImage = "url('./resources/images/background-cloudy.jpg')";
        }
        else if(tempValue < 26) {

            let hours = new Date().getHours();

            if (hours > 6 && hours < 20) {
                document.getElementById("weather-icon").src = "https://img.icons8.com/officel/80/000000/downpour.png";
                document.getElementById("main").style.backgroundImage = "url('./resources/images/background-rainy.jpg')";
            }
            else {
                document.getElementById("weather-icon").src = "https://img.icons8.com/fluent/96/000000/fog-day.png";
                document.getElementById("main").style.backgroundImage = "url('./resources/images/background-night.jpg')";
            }
        }

    })
}

function main() {

    weatherData("chittoor");
    displayTime();
}
