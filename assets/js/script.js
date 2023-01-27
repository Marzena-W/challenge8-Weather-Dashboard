$("#search-button").on("click", function(event) {
    event.preventDefault();

    var city = $("#search-input").val();
    // var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=e3fca67d9cc333a831026c5f07c8ba92";
    var queryURL = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=e3fca67d9cc333a831026c5f07c8ba92";
    
    
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(queryURL);
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
