// Runs searchWeather function when return key is pressed
$("#search-form").on("submit", function(event) {
    event.preventDefault();
    var searchInput = $("#form1").val();
    
    console.log(searchInput);
    
    searchWeather(searchInput);
});

// Runs searchWeather function when Search button is clicked
$("#search-button").on("click", function(event) {
    event.preventDefault();
    var searchInput = $("#form1").val();
    
    console.log(searchInput);
    
    searchWeather(searchInput);
});


function searchWeather(searchInput) {
    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "&appid=8a0b187f58134a2e51bff5ae31b7377e&units=imperial",
        method: "GET"
    }).then(function (apiResponse) {
        console.log("todayForecastData", apiResponse);

    $("#today-weather").empty();
    
    if (searchHistory) {
        searchHistory.push(searchInput);
        window.localStorage.setItem("searchhistory", JSON.stringify(searchHistory));
        makeListItem(searchInput);   
    }


    var city = $("<h4>").text(apiResponse.name + " (" + new Date().toLocaleDateString() + ")");
    var weatherCard = $("<div>").addClass("today-weather-card"); // use this to style card (Flexbox)
    var temperature = $("<div>").addClass("today-weather-stats").text("Temp: " + apiResponse.main.temp + "\u00B0F");
    var humidity = $("<div>").addClass("today-weather-stats").text("Humidity: " + apiResponse.main.humidity + "%");

    
    $("#today-weather").append(city, temperature, humidity)

    searchForecast (searchInput);

    searchUvIndex(apiResponse.coord.lat, apiResponse.coord.lon)

    })
}
