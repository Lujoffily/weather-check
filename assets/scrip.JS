var searchBtn = $('#searchBtn');
var searchBar = $('#searchBar');

searchBtn.on('click', function() {
    var citySearched = searchBar.val();
    var weatherURL = `https://api.openweathermap.org/data/2.5/forecast?q=${citySearched}&appid=8273654281581baa1557d409de6532cf`

        fetch(weatherURL)
            .then(response => {
                return response.json();
            })
            .then(data => {
                // How I got the name of the city 
                var city = data.city.name
                console.log('city ' + city);

                // How I got the temp of the city
                var temp = data.list[0].main.temp;
                var tempCel = temp - 273;
                var tempFah = tempCel * (9/5) + 32;
                var tempRound = Math.floor(tempFah)
                console.log('temp ' + tempRound);

                // How I got the wind speed
                var wind = data.list[0].wind.speed
                console.log('wind ' + wind);

                // How I got the humidity
                var humid = data.list[0].main.humidity
                console.log('humidity ' + humid);
            })
            .catch(error => {
            console.error('Error during fetch operation:', error);
            });
})