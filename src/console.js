export default function viewWeatherData(location) {
  console.log(`Weather Data for ${location.getName()}`);
  console.table(location);
  console.log(location.getTime());
  console.log(location.getFormattedDate());
}
