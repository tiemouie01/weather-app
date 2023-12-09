export default function viewWeatherData(location) {
  console.log(`Weather Data for ${location.name}`);
  console.table(location);
}
