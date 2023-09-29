const getTemperature = document.querySelector(".temp");
const clickBtn = document.querySelector(".clickBtn");
const inputSearch = document.querySelector("form input");
const getCity = document.querySelector(".city");
const getHumidity = document.querySelector(".humidity");
const getWindSpeed = document.querySelector(".wind");
const weatherImg = document.querySelector(".weather_Image");
const weatherError = document.querySelector(".error");
const weatherDisplay = document.querySelector(".weather_container");
const getForm = document.getElementById("form");

const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const apiKey = "01e24a5c54c54eb281d314f7ce844bda";

const WeatherDetails = async (city) => {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

    if (response.status === 404) {
      weatherError.style.display = "block";
      weatherDisplay.style.display = "none";
    } else {
      weatherDisplay.style.display = "block";
      weatherError.style.display = "none";
      const data = await response.json();
      console.log(data);
      getCity.innerHTML = data.name;
      getTemperature.innerHTML = `${Math.round(data.main.temp)}°C`;
      getHumidity.innerHTML = `${data.main.humidity}%`;
      getWindSpeed.innerHTML = `${data.wind.speed} km/hr`;

      if (data.weather[0].main === "Clouds") {
        weatherImg.src = "assets/clouds.png";
      } else if (data.weather[0].main === "Clear") {
        weatherImg.src = "assets/clear.png";
      } else if (data.weather[0].main === "Drizzle") {
        weatherImg.src = "assets/drizzle.png";
      } else if (data.weather[0].main === "Mist") {
        weatherImg.src = "assets/mist.png";
      } else if (data.weather[0].main === "Snow") {
        weatherImg.src = "assets/snow.png";
      }
    }
  } catch (error) {
    console.log(`The error is:${error}`);
  }
};

clickBtn.addEventListener("click", () => {
  if (inputSearch.value.trim() !== "") {
    WeatherDetails(inputSearch.value);
    inputSearch.value = "";
  }
});

form.addEventListener("keydown", (event) => {
  if (event.key === "Enter" && inputSearch.value.trim() !== "") {
    WeatherDetails(inputSearch.value);
    inputSearch.value = "";
    event.preventDefault();
  }
});
