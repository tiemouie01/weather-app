import Location from "./location";

function extractData(locationData) {
  const {country} = locationData.location;
  const city = locationData.location.name;
  const temperature = [
    locationData.current.temp_c,
    locationData.current.temp_f,
  ];
  const precipitation = locationData.current.precip_in;
  const windSpeed = locationData.current.wind_kph;
  const datetime = locationData.location.localtime;
  const condition = locationData.current.condition.text;
  const { humidity } = locationData.current;

  return [
    city,
    country,
    temperature,
    precipitation,
    humidity,
    windSpeed,
    datetime,
    condition,
  ];
}

export default async function fetchData(location) {
  // fetch data from the weather api.
  const url = `https://api.weatherapi.com/v1/current.json?key=8be0d307f40d43cbb3d51446233011&q=${location}`;
  const response = await fetch(url, { mode: "cors" });
  const locationData = await response.json();

  // return a Location object from the retrieved data by spreading the array return from extractData()
  return Location(...extractData(locationData));
}
