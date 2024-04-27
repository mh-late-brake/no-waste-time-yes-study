export default function msToDisplayTime(ms: number) {
  let seconds = (ms / 1000).toFixed();
  let minutes = (ms / (1000 * 60)).toFixed(1);
  let hours = (ms / (1000 * 60 * 60)).toFixed(1);
  let days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  if (+seconds < 60) return seconds + " second";
  else if (+minutes < 60) return minutes + " minute";
  else if (+hours < 24) return hours + " hour";
  else return days + " days"
}
