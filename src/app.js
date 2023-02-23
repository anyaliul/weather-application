function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
              <div class="col-2">
                <div class="weather-forecast-day">${formatDay(
                  forecastDay.dt
                )}</div>
                <img
                src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                alt="width="42"
                />
                <div class="weather-forecast-temperatures">
                  <span class="weather-forecast-temperature-celsius">
                    ${Math.round(forecastDay.temp.max)}° C
                  </span>
                  <span class="weather-forecast-temperature-fahrenheit">
                    | ${Math.round(forecastDay.temp.min)}° F
                  </span>
                </div>
              </div>
 `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "7ed26a6948c661d05fafe7355b41b2ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let humidityElement = document.querySelector("#humidity");
  let feelsLikeElement = document.querySelector("#feels-like");
  let windElement = document.querySelector("#wind");

  let iconElement = document.querySelector("#icon");
  let descriptionElement = document.querySelector("#description");

  celsiusTemperature = response.data.main.temp;

  temperatureElement.innerHTML = Math.round(celsiusTemperature);
  cityElement.innerHTML = response.data.name;
  humidityElement.innerHTML = response.data.main.humidity;
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed * 3.6);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "7ed26a6948c661d05fafe7355b41b2ec";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-field-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let searchForm = document.querySelector("#search-field");
searchForm.addEventListener("submit", handleSubmit);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");

// function typeCity(event) {
//   event.preventDefault();
//   let cityInput = document.querySelector("#search-field-input");
//   let apiKey = "7ed26a6948c661d05fafe7355b41b2ec";
//   let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&appid=${apiKey}&units=metric`;
//   axios.get(apiUrl).then(showCity);
//   axios.get(apiUrl).then(showTemp);
//   axios.get(apiUrl).then(showHumidity);
//   axios.get(apiUrl).then(showFeelsLike);
// }

// function showCity(response) {
//   let city = response.data.name;
//   let cityName = document.querySelector("#city");
//   cityName.innerHTML = `${city}`;
// }

// function showTemp(response) {
//   let temperature = Math.round(response.data.main.temp);
//   let tempInCity = document.querySelector("#temperature");
//   tempInCity.innerHTML = `${temperature} °C`;
// }

// function showHumidity(response) {
//   let humidity = response.data.main.humidity;
//   let humidityInCity = document.querySelector("#humidity");
//   humidityInCity.innerHTML = `Humidity: ${humidity}%`;
// }

// function showFeelsLike(response) {
//   let feelsLike = Math.round(response.data.main.feels_like);
//   let feelsLikeInCity = document.querySelector("#feels-like");
//   feelsLikeInCity.innerHTML = `Feels like: ${feelsLike} °C`;
// }

// function showCurrentCity(response) {
//   let currentCity = document.querySelector("#city");
//   currentCity.innerHTML = `${response.data.name}`;
// }

// let searchForm = document.querySelector("#search-field");
// searchForm.addEventListener("submit", typeCity);
