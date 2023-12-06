export default function Location(
  temperature,
  precipitation,
  humidity,
  windSpeed,
  time,
  day,
  condition,
) {
    const celsiusTemperature = temperature[0];
    const fahrenheitTemperature = temperature[1];

    return {
        celsiusTemperature,
        fahrenheitTemperature,
        precipitation,
        humidity,
        windSpeed,
        time,
        day,
        condition
    }
}