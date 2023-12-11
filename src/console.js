export default function viewWeatherData(location) {
  console.log(`Weather Data for ${location.name}`);
  console.table(location);
  console.log(location.getDate());
  console.log(location.getTime());
  console.log(location.getFormattedDate());
}
