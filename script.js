const myAPIKey = 'f3a53b113ee3edc1f98df25664c9486a';

var myCurrentCityURL = 'https://api.openweathermap.org/data/2.5/weather?q=San+Francisco&appid=f3a53b113ee3edc1f98df25664c9486a'

var myCityURL5 = 'https://api.openweathermap.org/data/2.5/forecast?q=San+Francisco&appid=f3a53b113ee3edc1f98df25664c9486a';

var uvIndex = 'https://api.openweathermap.org/data/2.5/uvi?appid=f3a53b113ee3edc1f98df25664c9486a&lat=37.7749&lon=-122.4194';

var myWeatherData = ['', '', '', ];

$.get(myCurrentCityURL, function(response) {
    console.log(response);
})

$.get(myCityURL5, function(response) {
    console.log(response);

    for (var i = 0; i < 40; i += 8) {

        console.log(response.list[i].dt_txt, response.list[i].wind.speed, response.list[i].main.humidity, response.city.coord.lat, response.city.coord.lon, response.list[i].weather[0].icon);

        var myImage = response.list[i].weather[0].icon;
        var myURL = "<img src='http://openweathermap.org/img/wn/" + myImage + "@2x.png' />";
        console.log("myURL", myURL)

        $(".imgDiv").html(myURL);
    }
})

$.get(uvIndex, function(response) {
    console.log("My UV Index is ", response.value);
})