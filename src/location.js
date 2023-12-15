import { format } from "date-fns";

export default function Location(
  city,
  country,
  temperature,
  precipitation,
  humidity,
  windSpeed,
  datetime,
  condition,
) {
  const celsiusTemperature = temperature[0];
  const fahrenheitTemperature = temperature[1];

  const getDate = () => datetime.split(" ")[0];
  const getTime = () => datetime.split(" ")[1];
  const getName = () => `${city}, ${country}`;

  // Methods that use date-fns.
  const getDayOfWeek = () => format(new Date(getDate()), "EEEE");
  const getDayOfMonth = () => format(new Date(getDate()), "d");
  const getMonth = () => format(new Date(getDate()), "MMMM");
  const getFormattedDate = () =>
    `${getDayOfWeek()}, ${getDayOfMonth()} ${getMonth()}`;

  const getWeatherDetails = () => [
    celsiusTemperature,
    fahrenheitTemperature,
    precipitation,
    humidity,
    windSpeed,
    condition,
  ];
  const getLocationDetails = () => [
    getName(),
    getFormattedDate(),
    getTime(),
    condition,
  ];

  return {
    getWeatherDetails,
    getLocationDetails,
  };
}
