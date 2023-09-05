// Check browser cache first, use if there and less than 10 seconds old
if (localStorage.time != null &&
    parseInt(localStorage.time) + 10000 > Date.now()) {

    let freshness = Math.round((Date.now() - localStorage.time) / 1000) + " second(s)";
    document.getElementById("city").innerHTML = localStorage.city;
    document.getElementById("temp").innerHTML = localStorage.temp;
    document.getElementById("description").innerHTML = localStorage.description;
    document.getElementById("icon").src = "http://openweathermap.org/img/wn/" + localStorage.icon + ".png";
    document.getElementById("humidity").innerHTML = localStorage.humidity;
    document.getElementById("wind_speed").innerHTML = localStorage.wind_speed;
    document.getElementById("time").innerHTML = freshness;

    // No local cache, access network
} else {

    //Fetch weather data of given city
    fetch('http://localhost/prototype2/api.php?city=slough')
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            document.getElementById("city").innerHTML = "Weather in " + response.weather_city;
            document.getElementById("description").innerHTML = response.weather_description;
            document.getElementById("temp").innerHTML = response.weather_temperature + "°C";
            document.getElementById("icon").src = "http://openweathermap.org/img/wn/" + response.weather_icon + ".png";
            document.getElementById("humidity").innerHTML = "Humidity: " + response.weather_humidity + "%";
            document.getElementById("wind_speed").innerHTML = "Wind Speed: " + response.weather_wind + "Km/H";
            document.getElementById("time").innerHTML = "Time: " + response.weather_when;
            document.body.style.backgroundImage = "url('https://source.unsplash.com/1600x900/?" + response.weather_city + "')";

            // Save new data to browser, with new timestamp
            localStorage.city = "Weather in " + response.weather_city;
            localStorage.description = response.weather_description;
            localStorage.temp = response.weather_temperature + "°C";
            localStorage.icon = "http://openweathermap.org/img/wn/" + response.weather_icon + ".png";
            localStorage.humidity = "Humidity: " + response.weather_humidity + "%";
            localStorage.wind_speed = "Wind Speed: " + response.weather_wind + "Km/H";
            localStorage.time = "Time: " + Date.now();

        })
        .catch(err => {
            // Display errors in console
            console.log(err);
        });
}