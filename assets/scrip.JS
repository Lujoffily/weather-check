var searchBtn = $('#searchBtn');
var searchBar = $('#searchBar');
var dayForecast = $('#dayCondition');
var cityHistory = $('#searchHistory')
var todaysDay = dayjs().format('DD/MM/YYYY')

searchBtn.on('click', function() {
    var citySearched = searchBar.val();
    var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearched}&appid=8273654281581baa1557d409de6532cf`

        fetch(weatherURL)
            .then(response => {
                return response.json();
            })
            .then(data => {
                var newHeader = $('<h3>');
                var newP1 = $('<p>');
                var newP2 = $('<p>');
                var newP3 = $('<p>');
                dayForecast.empty().append(newHeader, newP1, newP2, newP3);

                // How I got the name of the city 
                var city = data.city.name;
                newHeader.text(city + ' (' + todaysDay + ')');

                // How I got the temp of the city
                var temp = data.list[0].main.temp;
                var tempCel = temp - 273;
                var tempFah = tempCel * (9/5) + 32;
                var tempRound = Math.floor(tempFah);
                newP1.text('Temp: ' + tempRound + ' °F')

                // How I got the wind speed
                var wind = data.list[0].wind.speed;
                newP2.text('Wind: ' + wind + ' MPH');


                // How I got the humidity
                var humid = data.list[0].main.humidity
                newP3.text('Humidity: ' + humid + '%')
            })
            .catch(error => {
            console.error('Error during fetch operation:', error);
            });


    // Saving search to local storage 
    localStorage.setItem('city', citySearched)
    
    // Retrived city searched
    var lastCity = localStorage.getItem('city', citySearched)
    console.log(lastCity);
    
    // Display last searched city
    cityHistory.text(lastCity);
})

