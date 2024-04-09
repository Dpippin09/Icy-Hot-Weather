const submitButton = document.getElementById('searchButton');
const apiKey = "9c6c33508fb98511ab6c390bdee57633";

function getWeather(latitude,longitude) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
    
    
    fetch (weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    const today = data.list[0];
    const day2 = data.list[8];
    const day3 = data.list[16];
    const day4 = data.list[24];
    const day5 = data.list[32];
      console.log(today);
    });
}



function searchPressed() {
    console.log("submitted");
    const query = document.querySelector('#City').value;
    console.log(query)

    const coordinatesUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${apiKey}`; 

    let cities = JSON.parse(localStorage.getItem('cities')) || [];
    cities.push(query);
    localStorage.setItem('cities', JSON.stringify(cities));

    fetch(coordinatesUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {

    const city = data[0];
    const latitude = city.lat;
    const longitude = city.lon;

    getWeather(latitude,longitude);

      console.log(data);
    });
}


submitButton.addEventListener('click', searchPressed);

