const myAPIKey = 'f3a53b113ee3edc1f98df25664c9486a';
// var myCity = $('#cityInput').val();


var myCityURL5 = 'https://api.openweathermap.org/data/2.5/forecast?q=San+Francisco&appid=f3a53b113ee3edc1f98df25664c9486a';



var myWeatherData = ['', '', '', ];

$(".btn").click(function(event) {
    var myCity = $("#cityInput").val();
    console.log("myCity", myCity);
    event.preventDefault();
    currentWeather(myCity);

})

function currentWeather(myCity) {
    var myCurrentCityURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + myCity + '&appid=f3a53b113ee3edc1f98df25664c9486a';


    $.ajax({
            url: myCurrentCityURL,
            method: 'GET'
        })
        .then(function(response) {

            var tempF = (response.main.temp - 273.15) * 1.80 + 32;

            $("#city").html("<h1> City: " + response.name + "</h1>");
            $("#condition").html("<h2> Condition: " + response.weather[0].description + "</h2>");
            $("#temp").html("<h2> Temp: " + tempF.toFixed(2) + " F</h2>");
            $("#humidity").html("<h2> Humidity: " + response.main.humidity + "</h2>");
            $("#windSpeed").html("<h2> Wind Speed: " + response.wind.speed + "</h2>");

            getUV(response.coord.lat, response.coord.lon);
            console.log(response);


        })

}



$.get(myCityURL5, function(response) {
    console.log(response);

    for (var i = 0; i < 40; i += 8) {

        console.log(response.list[i].dt_txt, response.list[i].wind.speed, response.list[i].main.humidity, response.city.coord.lat, response.city.coord.lon, response.list[i].weather[0].icon);

        var myImage = response.list[i].weather[0].icon;
        var myURL = "<img src='http://openweathermap.org/img/wn/" + myImage + "@2x.png' />";
        console.log("myURL", myURL)

        $("#weatherIcon").html(myURL);
    }
})

function getUV(myLat, myLon) {
    var uvIndex = 'https://api.openweathermap.org/data/2.5/uvi?appid=f3a53b113ee3edc1f98df25664c9486a&lat=' + myLat + '&lon=' + myLon;
    console.log("getUV -> uvIndex", uvIndex)

    $.get(uvIndex, function(response) {
        $("#uvIndex").html("<h2> UV Index: " + response.value + "</h2>");
        console.log("My UV Index is ", response.value);

        if (response.value <= 2) {
            $("#uvIndex").css({ "background-color": "green", "color": "snow" });
        } else if (response.value <= 5) {
            $("#uvIndex").css({ "background-color": "yellow", "color": "black" });
        } else if (response.value <= 7) {
            $("#uvIndex").css({ "background-color": "orange", "color": "snow" });
        } else if (response.value <= 10) {
            $("#uvIndex").css({ "background-color": "red", "color": "snow" });
        } else {
            $("#uvIndex").css({ "background-color": "purple", "color": "snow" });
        };
    })

}