var cities = [];
console.log(cities);

function showCityWeather() {
    var city = $("#search-input").val().trim();
    cities.push(city);

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e3fca67d9cc333a831026c5f07c8ba92";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);

        var wind = response.wind.speed;
        var humidity = response.main.humidity;
        var tempK = response.main.temp;
        var tempC = parseFloat(tempK - 273.15).toFixed(1);

        var today = moment().format("L");

        var cityName = $("<h4 class='cityname'>").text(city + " (" + today + ")");
        var tempTag = $("<p>").text("Temp: " + tempC + " °C");
        var windTag = $("<p>").text("Wind: " + wind + " KPH");
        var humidityTag = $("<p>").text("Humidity: " + humidity + "%");

        $("#today").append(cityName);
        $("#today").append(tempTag);
        $("#today").append(windTag);
        $("#today").append(humidityTag);
    })
    $("#search-input").val("");
    renderCityBtns()
}

function showCity() {
    $("#search-button").on("click", function (event) {
        event.preventDefault();
        showCityWeather();
    })
};

function renderCityBtns() {
    $("#history").empty();
    for (var i = 0; i < cities[i].length; i++) {
        var cityBtn = $("<button>");
        cityBtn.addClass("cityBtn");
        cityBtn.text(cities[i]);
        $("#history").append(cityBtn);
    }
}

showCity();