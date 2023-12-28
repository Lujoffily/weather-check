var searchBtn = $('#searchBtn');
var searchBar = $('#searchBar');
var dayForecast = $('#dayCondition');
var cityHeader = $('#cityHeader');
var tempDisplay = $('#tempDisplay');
var windDisplay = $('#windDisplay');
var humidityDisplay = $('#humidityDisplay');
var cityHistory = $('#searchHistory');
var todaysDay = dayjs().format('DD/MM/YYYY');

searchBtn.on('click', function() {
var citySearched = searchBar.val();
var weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearched}&appid=8273654281581baa1557d409de6532cf`
    fetch(weatherURL)
        .then(response => {
            return response.json();
        })
        .then(data => {
            var newHeader = $('<h3>');
            var newP1 = $('<p>');
            var newP2 = $('<p>');
            var newP3 = $('<p>');
            dayForecast.empty().append(newHeader, newP1, newP2, newP3, iconEl);

            // How I got my icon
            var iconEl = $('#current-weather-icon');
            iconEl.addClass('current-icon');
            var icon = data.weather[0].icon;
            iconEl.attr('src', `https://openweathermap.org/img/wn/${icon}@2x.png`);

            // How I got the name of the city 
            var city = data.name;
            newHeader.text('City: ' + city + ' (' + todaysDay + ') ' + icon);

            // How I got the temp of the city
            var temp = data.main.temp;
            var tempCel = temp - 273;
            var tempFah = tempCel * (9/5) + 32;
            var tempRound = Math.floor(tempFah);
            newP1.text('Temp: ' + tempRound + ' °F')

            // How I got the wind speed
            var wind = data.wind.speed;
            newP2.text('Wind: ' + wind + ' MPH');


            // How I got the humidity
            var humid = data.main.humidity
            newP3.text('Humidity: ' + humid + '%')

            // Saving city searched to local storage and retribing it 
            var cities = JSON.parse(localStorage.getItem('cities')) || [];

            cities.push(citySearched);

            localStorage.setItem('cities', JSON.stringify(cities));

            JSON.parse(localStorage.getItem('cities')) || [];
            
            // Retrived city searched
            var btnNew  = $('<button>');
            btnNew.text(citySearched);
            cityHistory.append(btnNew);
            
            // Display last searched city

            // How to display 5 day forecast

        })
        .catch(error => {
        console.error('Error during fetch operation:', error);
        });

var forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearched}&appid=8273654281581baa1557d409de6532cf`

    fetch(forecastURL)
    .then(response => {
        // console.log(response.json());
        return response.json();
    })
    .then(data => {
        var futureDay = $('<h3>');
        var futureTemp = $('<p>');
        var futureWind = $('<p>');
        var futureHumidity = $('<p>');
        $('#forecastOne').empty().append(futureDay, futureTemp, futureWind, futureHumidity);
        $('#forecastTwo').empty().append(futureDay, futureTemp, futureWind, futureHumidity);
        $('#forecastThree').empty().append(futureDay, futureTemp, futureWind, futureHumidity);
        $('#forecastFour').empty().append(futureDay, futureTemp, futureWind, futureHumidity);
        $('#forecastFive').empty().append(futureDay, futureTemp, futureWind, futureHumidity);

        var temp = data.list[0].main.temp;
        var tempCel = temp - 273;
        var tempFah = tempCel * (9/5) + 32;
        var tempRound = Math.floor(tempFah);
        futureTemp.text('Temp: ' + tempRound + ' °F');

        var wind = data.list[0].wind.speed;
        futureWind.text('Wind: ' + wind + ' MPH');

        var humid = data.list[0].main.humidity
        futureHumidity.text('Humidity: ' + humid + '%')
    })           
})
