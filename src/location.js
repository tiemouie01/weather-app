export default function Location(
  name,
  temperature,
  precipitation,
  humidity,
  windSpeed,
  datetime,
  condition,
) {
  const celsiusTemperature = temperature[0];
  const fahrenheitTemperature = temperature[1];

  return {
    name,
    celsiusTemperature,
    fahrenheitTemperature,
    precipitation,
    humidity,
    windSpeed,
    condition,
  };
}
