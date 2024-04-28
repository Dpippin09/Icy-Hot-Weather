let cities = JSON.parse(localStorage.getItem('cities')) || [];
const searchHistoryEl = document.querySelector('.search-history');
const submitButton = document.getElementById('searchButton');
const apiKey = "9c6c33508fb98511ab6c390bdee57633";
const forecastContainer=document.querySelector(".forecast")
const currentDayContainer=document.querySelector(".Current-Day")
function getWeather(latitude,longitude) {
    const weatherUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`
    
    
    fetch (weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
    const monday = data.list[0];
    const tuesday = data.list[8];
    const wednesday = data.list[16];
    const thursday = data.list[24];
    const friday = data.list[32];
      console.log(monday);
      console.log(tuesday);
      console.log(wednesday);
      console.log(thursday);
      console.log(friday);
      for (var i=0; i <= 32; i=i+8){
        let day=data.list[i]
        let temp=day.main.temp
        let tempEl=document.createElement("p")
        tempEl.textContent=temp
        let dayEl =document.createElement("div")
        forecastContainer.append(dayEl)
        dayEl.append(tempEl)
        let weather=day.weather[0].main
        let weatherEl=document.createElement("p")
        weatherEl.textContent=weather
        dayEl.append(weatherEl)
      }

    });
}

function loadSearchedCities() {

cities.forEach(city => {
let cityButton=document.createElement ('button')
cityButton.textContent=city
searchHistoryEl.append(cityButton)
})
}


function searchPressed() {
    console.log("submitted");
    const query = document.querySelector('#City').value;
    console.log(query)

    if(!cities.includes(query)){
      cities.push(query);
      localStorage.setItem('cities', JSON.stringify(cities));
      let cityButton=document.createElement ('button')
      cityButton.textContent=query
      searchHistoryEl.append(cityButton)
    }

    const coordinatesUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=1&appid=${apiKey}`; 


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

function displayStoreItem(product) {
  document.getElementById("dayData" + product.id).textContent =
    product.title + " - $" + product.price;

  description = product.description;
  if (description.length > 30) {
    description = description.substring(0, 100) + "...";
  }
  document.getElementById("panel-footer" + product.id).textContent =
    description;
}

function saveProductToLocal(event) {
  let eventNode =
    event.target.parentElement.previousElementSibling.previousElementSibling;
  var productTitle = eventNode.textContent.split("-")[0];
  var productPrice = eventNode.textContent.split("$")[1];
  // console.log({eventNode}, eventNode.textContent.split("$")[1]);
  var product = {
    title: productTitle,
    price: productPrice,
  };
}

loadSearchedCities()




//   function displayTheWeather(data) {
//    document.getElementById('tmep1').textContent = data.main.temp;
//    document.getElementById('date').textContent = moment().format('MM/DD/YYY');
//  }
// const data = "cities";
// if (item) {
//     const button = document.createElement('button');
//     button.textContent = item;
//     const buttonContainer = document.getElementById('buttonContainer');
//     buttonContainer.appendChild(button);
// } else {
//     console.log('Item not found in local storage');
// }

//  function displayItemFromLocalStorage() {
//    let item = localStorage.getItem('cities');
//  for (let i = 0; i < data.length; i++) {
//    displayItemFromLocalStorage(data.list[i], data.city.name);




//}}


 //submitButton.addEventListener('click', searchPressed);
