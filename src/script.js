import fetchData from "./api";
import viewWeatherData from "./console";

fetchData("lilongwe").then((response) => {
  viewWeatherData(response);
});