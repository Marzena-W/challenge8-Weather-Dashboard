var cities = [];

function showCity() {
    $("#search-button").on("click", function (event) {
        event.preventDefault();
        var city = $("#search-input").val().trim();
        showCityWeather(city);
    })
};

function showCityWeather(city) {
    if (cities.includes(city) === false) {
        cities.push(city);
        localStorage.setItem("cities", JSON.stringify(cities));
    }

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e3fca67d9cc333a831026c5f07c8ba92";

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);

        $("#today").empty();
        var wind = response.wind.speed;
        var humidity = response.main.humidity;
        var tempK = response.main.temp;
        var tempC = parseFloat(tempK - 273.15).toFixed(1);

        var today = moment().format("L");

        var iconPath = response.weather[0].icon;
        var iconUrl = "https://openweathermap.org/img/wn/" + iconPath + ".png";
        var icon = $("<img>").attr("src", iconUrl);

        var cityName = $("<h4 class='cityname'>").append(city, " (", today, ")", icon);
        var tempTag = $("<p>").text("Temp: " + tempC + " °C");
        var windTag = $("<p>").text("Wind: " + wind + " KPH");
        var humidityTag = $("<p>").text("Humidity: " + humidity + "%");

        $("#today").append(cityName, tempTag, windTag, humidityTag);
        $("#today").css("border", "border: 1px solid black;")
    })


    // forecast for 5 days
    var myQueryURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=e3fca67d9cc333a831026c5f07c8ba92";

    $.ajax({
        url: myQueryURL,
        method: "GET"
    }).then(function (forecast) {
        console.log(myQueryURL);

        var daysResult = forecast.list;
        console.log(daysResult);

        $("#forecast").empty();
        var show5Days = $("<h4 class='daysHeader'>").text("5-Day Forecast:");
        $("#forecast").append(show5Days);
        var next = 0;

        for (var i = 5; i < daysResult.length; i += 8) {
            var daysDiv = $("<div class='daysDivs'>");
        
            next += 1;
            var daysDate = moment().add(next, "day").format("L"); 
            var daysDateTag = $("<p>").text(daysDate);

            var daysIconPath = forecast.list[i].weather[0].icon;
            var daysIconPathUrl = "https://openweathermap.org/img/wn/" + daysIconPath + ".png";
            var daysIcon = $("<img>").attr("src", daysIconPathUrl);

            var daysTempK = forecast.list[i].main.temp;
            var daysTempC = parseFloat(daysTempK - 273.15).toFixed(1);
            var daysWind = forecast.list[i].wind.speed;
            var daysHumidity = forecast.list[i].main.humidity;
            
            var daysTempTag = $("<p>").text("Temp: " + daysTempC + " °C");
            var daysWindTag = $("<p>").text("Wind: " + daysWind + " KPH");
            var daysHumidityTag = $("<p>").text("Humidity: " + daysHumidity + "%");

            daysDiv.append(daysDateTag, daysIcon, daysTempTag, daysWindTag, daysHumidityTag);
            $("#forecast").append(daysDiv);
        }
    });

    // clearing search input field
    $("#search-input").val("");
    // calling a function to render buttons for searched city
    renderCityBtns()
}

// rendering buttons for each searched city
function renderCityBtns() {
    $("#history").empty();
    if (localStorage.getItem("cities")) {
        cities = JSON.parse(localStorage.getItem("cities"))
    }
    for (var i = 0; i < cities.length; i++) {
        var cityBtn = $("<button>");
        cityBtn.addClass("cityBtn");
        cityBtn.text(cities[i]);
        $("#history").append(cityBtn);
    }
    $(".cityBtn").on("click", function () {
        var city = $(this).text();
        console.log(city);
        showCityWeather(city);
    })
}
renderCityBtns();
showCity();