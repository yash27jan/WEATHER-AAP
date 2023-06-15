const heroSection = document.getElementById("hero-section");
const loadingSection = document.getElementById("loading-section");
const errorSection = document.getElementById("error-section");
const key = "41d0b3521b5079d62f148acc876fe96b";
let searchBtn = document.getElementById("search-btn");

// Requesting from api
searchBtn.addEventListener("click", showWeather);
async function showWeather() {
  heroSection.style.display = "none";
  loadingSection.style.display = "grid";
  let cityName = document.getElementById("search-city").value;
  try {
    let responseText = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${key}`
    );

    let response = await responseText.json();

    loadingSection.style.display = "none";
    populateDOM(response);
  } catch (e) {
    errorSection.style.display = "grid";
    console.log(e);
  }
}

// populate on DOM
function populateDOM(response) {
  let html = `
    <div class="response-section-center">

    <h2>${response.name}, <span class="country">${response.sys.country}</span></h2>
    <div class="weather-description">
      ${response.weather[0].main}
    </div>
    <img src="https://openweathermap.org/img/w/${response.weather[0].icon}.png" alt="" class="weather-image">
    <p class="weather-report" id="weather-report">
      
      <h4> <span class="propery">Current temperature:      </span><span class="value"> ${response.main.temp} F</span></h4>
      <h4> <span class="propery">Min Temp :     </span><span class="value"> ${response.main.temp_min} F</span></h4>
      <h4> <span class="propery">Max Temp :     </span><span class="value"> ${response.main.temp_max} F</span></h4>
      <h4> <span class="propery">Wind Speed :    </span><span class="value"> ${response.wind.speed}</span></h4>
      <h4> <span class="propery">Pressure :    </span><span class="value"> ${response.main.pressure}</span></h4>
      <h4> <span class="propery">Humidity :    </span><span class="value">  ${response.main.humidity}%</span></h4>
    </p>
  </div>
    `;
  document.getElementById("response-section").innerHTML = html;
}
