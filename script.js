const API_KEY = "b645f21a5bf384b9fbe4e7b5d4db7aa1";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    displayMessage("Please enter a city name.");
    return;
  }
  getWeather(city);
});

cityInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

function displayMessage(msg) {
  const card = document.getElementById("weatherResult");
  card.innerHTML = `<p>${msg}</p>`;
}

function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      const card = document.getElementById("weatherResult");

      if (data.cod !== 200) {
        displayMessage(`⚠️ ${data.message}`);
        return;
      }

      card.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <p>🌡 Temperature: <strong>${data.main.temp}°C</strong></p>
        <p>☁ Condition: ${data.weather[0].description}</p>
        <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
      `;
    })
    .catch(() => {
      displayMessage("Error fetching weather data.");
    });
}
