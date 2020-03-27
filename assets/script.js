const myAPIKey = 'f3a53b113ee3edc1f98df25664c9486a';

var time = moment();

savedSerach();


var myWeatherData = ['', '', '', ];

$(".btn").click(function(event) {
    var myCity = $("#cityInput").val();
    // console.log("myCity", myCity);
    event.preventDefault();
    currentWeather(myCity);
    futureForecast(myCity);
    recentSearch(myCity);
})

$(".btn-success").click(function(event) {
    event.preventDefault();
    currentWeather(pastSearch);
    futureForecast(pastSearch);
})

//function to get the current weather conditions
function currentWeather(myCity) {
    var myCurrentCityURL = 'https://api.openweathermap.org/data/2.5/weather?q=' + myCity + '&appid=f3a53b113ee3edc1f98df25664c9486a';


    $.ajax({
            url: myCurrentCityURL,
            method: 'GET'
        })
        .then(function(response) {

            //temp conversion to Fahrenheit
            var tempF = (response.main.temp - 273.15) * 1.80 + 32;
            var myCurrentImage = response.weather[0].icon;
            var myCurrentURL = "<img src='http://openweathermap.org/img/wn/" + myCurrentImage + "@2x.png' />";

            $("#city").html("<h1> City: " + response.name + "</h1>");
            $("#date").html(moment().format("MM/DD/YYYY"));
            $("#condition").html("<h2> Condition: " + response.weather[0].description + "</h2>");
            $("#weatherIcon").html(myCurrentURL);
            $("#temp").html("<h2> Temp: " + tempF.toFixed(2) + " <span>&#176;</span>F</h2>");
            $("#humidity").html("<h2> Humidity: " + response.main.humidity + "</h2>");
            $("#windSpeed").html("<h2> Wind Speed: " + response.wind.speed + "</h2>");

            getUV(response.coord.lat, response.coord.lon);
            // console.log(response);


        })

}

//function for a 5 day forecast
function futureForecast(myCity) {
    var myCityURL5 = 'https://api.openweathermap.org/data/2.5/forecast?q=' + myCity + '&appid=f3a53b113ee3edc1f98df25664c9486a';


    $.get(myCityURL5, function(response) {
        console.log(response);



        for (var i = 0; i < 40; i += 8) {
            console.log(response.list[i].dt_txt, response.list[i].wind.speed, response.list[i].main.humidity, response.city.coord.lat, response.city.coord.lon, response.list[i].weather[0].icon);

            var myPulledDate = response.list[i].dt_txt.substring(0, 10);
            myMomentDate = moment(myPulledDate).format("MM/DD/YYYY");

            $("#date1").html(response.list[8].dt_txt);
            $("#date2").html(response.list[16].dt_txt);
            $("#date3").html(response.list[24].dt_txt);
            $("#date4").html(response.list[32].dt_txt);
            $("#date5").html(response.list[39].dt_txt);

            $("#con1").html(response.list[8].weather[0].description);
            $("#con2").html(response.list[16].weather[0].description);
            $("#con3").html(response.list[24].weather[0].description);
            $("#con4").html(response.list[32].weather[0].description);
            $("#con5").html(response.list[39].weather[0].description);

            $("#temp1").html('Temp: ' + ((response.list[8].main.temp - 273.15) * 1.80 + 32).toFixed(2) + ' <span>&#176;</span>F');
            $("#temp2").html('Temp: ' + ((response.list[16].main.temp - 273.15) * 1.80 + 32).toFixed(2) + ' <span>&#176;</span>F');
            $("#temp3").html('Temp: ' + ((response.list[24].main.temp - 273.15) * 1.80 + 32).toFixed(2) + ' <span>&#176;</span>F');
            $("#temp4").html('Temp: ' + ((response.list[32].main.temp - 273.15) * 1.80 + 32).toFixed(2) + ' <span>&#176;</span>F');
            $("#temp5").html('Temp: ' + ((response.list[39].main.temp - 273.15) * 1.80 + 32).toFixed(2) + ' <span>&#176;</span>F');

            $("#humid1").html('Humidity: ' + response.list[8].main.humidity);
            $("#humid2").html('Humidity: ' + response.list[16].main.humidity);
            $("#humid3").html('Humidity: ' + response.list[24].main.humidity);
            $("#humid4").html('Humidity: ' + response.list[32].main.humidity);
            $("#humid5").html('Humidity: ' + response.list[39].main.humidity);

            $("#wind1").html('Wind Speed: ' + response.list[8].wind.speed);
            $("#wind2").html('Wind Speed: ' + response.list[16].wind.speed);
            $("#wind3").html('Wind Speed: ' + response.list[24].wind.speed);
            $("#wind4").html('Wind Speed: ' + response.list[32].wind.speed);
            $("#wind5").html('Wind Speed: ' + response.list[39].wind.speed);



            $("#icon1").html("<img src='http://openweathermap.org/img/wn/" + response.list[8].weather[0].icon + "@2x.png' />");
            $("#icon2").html("<img src='http://openweathermap.org/img/wn/" + response.list[16].weather[0].icon + "@2x.png' />");
            $("#icon3").html("<img src='http://openweathermap.org/img/wn/" + response.list[24].weather[0].icon + "@2x.png' />");
            $("#icon4").html("<img src='http://openweathermap.org/img/wn/" + response.list[32].weather[0].icon + "@2x.png' />");
            $("#icon5").html("<img src='http://openweathermap.org/img/wn/" + response.list[39].weather[0].icon + "@2x.png' />");


        }
    })
}


//function to get the UV Index for the searched location
function getUV(myLat, myLon) {
    var uvIndex = 'https://api.openweathermap.org/data/2.5/uvi?appid=f3a53b113ee3edc1f98df25664c9486a&lat=' + myLat + '&lon=' + myLon;
    // console.log("getUV -> uvIndex", uvIndex)

    $.get(uvIndex, function(response) {
        $("#uvIndex").html("<h2> UV Index: " + response.value + "</h2>");
        // console.log("My UV Index is ", response.value);

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

// function to saved recent searches to localstorage and add a button for past searches
function recentSearch(myCity) {
    localStorage.setItem('city', JSON.stringify(myCity))

    $("#results").prepend("<button type='button' class='btn btn-success btn-lg'>" + myCity + "</button>");

}

function savedSerach() {
    var pastSearch = JSON.parse(localStorage.getItem('city'));

    if (pastSearch) {

        $("#results").prepend("<button type='button' class='btn btn-success btn-lg'>" + pastSearch + "</button>");
    };

    $(".btn-success").click(function(event) {
        event.preventDefault();
        currentWeather(pastSearch);
        futureForecast(pastSearch);
    })

}