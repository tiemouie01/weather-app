import Location from "./location";
import fetchData from "./api";

function addLocationData(name, date, time, condition) {
  // Create a container for the location data.
  const locationContainer = document.createElement("div");
  locationContainer.className = "location-container";

  // Add values necessary location details to the container.
  const nameElement = document.createElement("h2");
  nameElement.className = "location-value";
  locationContainer.appendChild(nameElement);

  const dateElement = document.createElement("p");
  dateElement.className = "location-value";
  locationContainer.appendChild(dateElement);

  const timeElement = document.createElement("p");
  timeElement.className = "location-value";
  locationContainer.appendChild(timeElement);

  const conditionElement = document.createElement("p");
  conditionElement.className = "location-value";
  locationContainer.appendChild(conditionElement);

  return locationContainer;
}

function toggleTemperature(event, celsiusTemperature, fahrenheitTemperature) {
  const temperature = document.querySelector(".temperature").textContent;
  const toggleButton = event.target;

  if (temperature.includes("C")) {
    temperature.textContent = `${fahrenheitTemperature} °F`;
    toggleButton.textContent = "°C";
  } else {
    temperature.textContent = `${celsiusTemperature} °C`;
    toggleButton.textContent = "°F";
  }
}

function setIcon(condition) {
  let svg;

  if (condition.includes("partly cloudy")) {
    svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12.74,5.47C15.1,6.5 16.35,9.03 15.92,11.46C17.19,12.56 18,14.19 18,16V16.17C18.31,16.06 18.65,16 19,16A3,3 0 0,1 22,19A3,3 0 0,1 19,22H6A4,4 0 0,1 2,18A4,4 0 0,1 6,14H6.27C5,12.45 4.6,10.24 5.5,8.26C6.72,5.5 9.97,4.24 12.74,5.47M11.93,7.3C10.16,6.5 8.09,7.31 7.31,9.07C6.85,10.09 6.93,11.22 7.41,12.13C8.5,10.83 10.16,10 12,10C12.7,10 13.38,10.12 14,10.34C13.94,9.06 13.18,7.86 11.93,7.3M13.55,3.64C13,3.4 12.45,3.23 11.88,3.12L14.37,1.82L15.27,4.71C14.76,4.29 14.19,3.93 13.55,3.64M6.09,4.44C5.6,4.79 5.17,5.19 4.8,5.63L4.91,2.82L7.87,3.5C7.25,3.71 6.65,4.03 6.09,4.44M18,9.71C17.91,9.12 17.78,8.55 17.59,8L19.97,9.5L17.92,11.73C18.03,11.08 18.05,10.4 18,9.71M3.04,11.3C3.11,11.9 3.24,12.47 3.43,13L1.06,11.5L3.1,9.28C3,9.93 2.97,10.61 3.04,11.3M19,18H16V16A4,4 0 0,0 12,12A4,4 0 0,0 8,16H6A2,2 0 0,0 4,18A2,2 0 0,0 6,20H19A1,1 0 0,0 20,19A1,1 0 0,0 19,18Z" /></svg>';
  } else if (condition.includes("rain")) {
    svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M9,12C9.53,12.14 9.85,12.69 9.71,13.22L8.41,18.05C8.27,18.59 7.72,18.9 7.19,18.76C6.65,18.62 6.34,18.07 6.5,17.54L7.78,12.71C7.92,12.17 8.47,11.86 9,12M13,12C13.53,12.14 13.85,12.69 13.71,13.22L11.64,20.95C11.5,21.5 10.95,21.8 10.41,21.66C9.88,21.5 9.56,20.97 9.7,20.43L11.78,12.71C11.92,12.17 12.47,11.86 13,12M17,12C17.53,12.14 17.85,12.69 17.71,13.22L16.41,18.05C16.27,18.59 15.72,18.9 15.19,18.76C14.65,18.62 14.34,18.07 14.5,17.54L15.78,12.71C15.92,12.17 16.47,11.86 17,12M17,10V9A5,5 0 0,0 12,4C9.5,4 7.45,5.82 7.06,8.19C6.73,8.07 6.37,8 6,8A3,3 0 0,0 3,11C3,12.11 3.6,13.08 4.5,13.6V13.59C5,13.87 5.14,14.5 4.87,14.96C4.59,15.43 4,15.6 3.5,15.32V15.33C2,14.47 1,12.85 1,11A5,5 0 0,1 6,6C7,3.65 9.3,2 12,2C15.43,2 18.24,4.66 18.5,8.03L19,8A4,4 0 0,1 23,12C23,13.5 22.2,14.77 21,15.46V15.46C20.5,15.73 19.91,15.57 19.63,15.09C19.36,14.61 19.5,14 20,13.72V13.73C20.6,13.39 21,12.74 21,12A2,2 0 0,0 19,10H17Z" /></svg>';
  } else if (condition.includes("snow")) {
    svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M4,16.36C3.86,15.82 4.18,15.25 4.73,15.11L7,14.5L5.33,12.86C4.93,12.46 4.93,11.81 5.33,11.4C5.73,11 6.4,11 6.79,11.4L8.45,13.05L9.04,10.8C9.18,10.24 9.75,9.92 10.29,10.07C10.85,10.21 11.17,10.78 11,11.33L10.42,13.58L12.67,13C13.22,12.83 13.79,13.15 13.93,13.71C14.08,14.25 13.76,14.82 13.2,14.96L10.95,15.55L12.6,17.21C13,17.6 13,18.27 12.6,18.67C12.2,19.07 11.54,19.07 11.15,18.67L9.5,17L8.89,19.27C8.75,19.83 8.18,20.14 7.64,20C7.08,19.86 6.77,19.29 6.91,18.74L7.5,16.5L5.26,17.09C4.71,17.23 4.14,16.92 4,16.36M1,10A5,5 0 0,1 6,5C7,2.65 9.3,1 12,1C15.43,1 18.24,3.66 18.5,7.03L19,7A4,4 0 0,1 23,11A4,4 0 0,1 19,15A1,1 0 0,1 18,14A1,1 0 0,1 19,13A2,2 0 0,0 21,11A2,2 0 0,0 19,9H17V8A5,5 0 0,0 12,3C9.5,3 7.45,4.82 7.06,7.19C6.73,7.07 6.37,7 6,7A3,3 0 0,0 3,10C3,10.85 3.35,11.61 3.91,12.16C4.27,12.55 4.26,13.16 3.88,13.54C3.5,13.93 2.85,13.93 2.47,13.54C1.56,12.63 1,11.38 1,10M14.03,20.43C14.13,20.82 14.5,21.04 14.91,20.94L16.5,20.5L16.06,22.09C15.96,22.5 16.18,22.87 16.57,22.97C16.95,23.08 17.35,22.85 17.45,22.46L17.86,20.89L19.03,22.05C19.3,22.33 19.77,22.33 20.05,22.05C20.33,21.77 20.33,21.3 20.05,21.03L18.89,19.86L20.46,19.45C20.85,19.35 21.08,18.95 20.97,18.57C20.87,18.18 20.5,17.96 20.09,18.06L18.5,18.5L18.94,16.91C19.04,16.5 18.82,16.13 18.43,16.03C18.05,15.92 17.65,16.15 17.55,16.54L17.14,18.11L15.97,16.95C15.7,16.67 15.23,16.67 14.95,16.95C14.67,17.24 14.67,17.7 14.95,17.97L16.11,19.14L14.54,19.55C14.15,19.65 13.92,20.05 14.03,20.43Z" /></svg>';
  } else if (condition.includes("cloud")) {
    svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M6,19A5,5 0 0,1 1,14A5,5 0 0,1 6,9C7,6.65 9.3,5 12,5C15.43,5 18.24,7.66 18.5,11.03L19,11A4,4 0 0,1 23,15A4,4 0 0,1 19,19H6M19,13H17V12A5,5 0 0,0 12,7C9.5,7 7.45,8.82 7.06,11.19C6.73,11.07 6.37,11 6,11A3,3 0 0,0 3,14A3,3 0 0,0 6,17H19A2,2 0 0,0 21,15A2,2 0 0,0 19,13Z" /></svg>';
  } else {
    svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z" /></svg>';
  }
  return svg;
}

function addWeatherData(
  celsiusTemperature,
  fahrenheitTemperature,
  precipitation,
  humidity,
  windSpeed,
  condition,
) {
  // Create a container for weather data and append it to the main container.
  const weatherContainer = document.createElement("div");
  weatherContainer.className = "weather-container";

  // Add a weather icon to the page according to the condition.
  const conditionDiv = document.createElement("div");
  conditionDiv.innerHTML = setIcon(condition);
  weatherContainer.appendChild(conditionDiv);

  // Add another container that holds the actual weather data values.
  const dataContainer = document.createElement("div");

  // Add a div that holds the temperature value and its corresponding toggle button.
  const temperatureContainer = document.createElement("div");
  const temperature = document.createElement("h2");
  temperature.className = "temperature";
  temperature.textContent = `${celsiusTemperature} °C`;
  temperatureContainer.appendChild(temperature);
  const toggleButton = document.createElement("button");
  toggleButton.className = "toggle-button";
  toggleButton.textContent = "°F";
  toggleButton.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleTemperature(event, celsiusTemperature, fahrenheitTemperature);
  });
  dataContainer.appendChild(temperatureContainer);

  // Add remaining weather data values.
  const precipitationElement = document.createElement("p");
  precipitationElement.className = "weather-value";
  precipitationElement.textContent = precipitation;
  dataContainer.appendChild(precipitationElement);

  const humidityElement = document.createElement("p");
  humidityElement.className = "weather-value";
  humidityElement.textContent = humidity;
  dataContainer.appendChild(humidityElement);

  const windSpeedElement = document.createElement("p");
  windSpeedElement.className = "weather-value";
  windSpeedElement.textContent = windSpeed;
  dataContainer.appendChild(windSpeedElement);

  weatherContainer.appendChild(dataContainer);
  return weatherContainer;
}

export default function Interface() {
  // Add an event listener to the search button.
  const searchButton = document.querySelector(".search-button");
  searchButton.addEventListener("click", (event) => {
    event.preventDefault();

    // Clear the DOM of any previous weather data.
    const mainContentDiv = document.querySelector(".main-content");
    while (mainContentDiv.firstElementChild) {
      mainContentDiv.removeChild(mainContentDiv.firstElementChild);
    }

    // Collect the search value from the input and set it as the location name.
    const locationName = document.getElementById("location");
    fetchData(locationName).then((response) => {
      const locationData = response;
      const mainContainer = document.querySelector(".main-content");

      // Add weather data to the left of the page.
      mainContainer.appendChild(
        addWeatherData(...locationData.getWeatherDetails),
      );

      // Add location data to the right of the page.
      mainContainer.appendChild(
        addLocationData(...locationData.getLocationDetails()),
      );
    });
  });
}
