import fetchData from "./api";
import viewWeatherData from "./console";
import "./styles.css";

fetchData("lilongwe").then((response) => {
  viewWeatherData(response);
});
