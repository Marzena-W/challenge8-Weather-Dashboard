$("#search-button").on("click", function (event) {
    event.preventDefault();

    var city = $("#search-input").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=e3fca67d9cc333a831026c5f07c8ba92";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(queryURL);

        var wind = response.wind.speed;
        var humidity = response.main.humidity;
        var tempK = response.main.temp;
        var tempC = parseFloat(tempK - 273.15).toFixed(1)

        var today = moment().format("L");


        // var iconPath = response.weather.icon;
        // var iconUrl = "https://openweathermap.org/img/wn/" + iconPath + ".png";
        // var icon = $("<img>").attr("src", iconUrl);


        var cityName = $("<h4 class='cityname'>").text(city + " (" + today + ")");
        var tempTag = $("<p>").text("Temp: " + tempC + " °C");
        var windTag = $("<p>").text("Wind: " + wind + " KPH");
        var humidityTag = $("<p>").text("Humidity: " + humidity + "%");

        $("#today").append(cityName);
        $("#today").append(tempTag);
        $("#today").append(windTag);
        $("#today").append(humidityTag);


    })
})








// on click of a button
    // take the input (city name) from search form and
        // show current day result in #today by
            // creating header <h3> with city name, date, icon
            // creating 3x <p> for: Temp, Wind, Humidity
            // append h3 and p to #today

        // show 5-day forecast in #forecast
            // create 5 divs(?)
            // create date
            // icon
            // 3x <p> for: Temp, Wind, Humidity
            // append to all created to #forecast

    // save data to local storage
        // create button with city name
        // save button in #history
