const days = [
  {
    day: "Today",
    hi: "86",
    lo: "55",
    weather: "Sunny",
  },
  {
    day: "Monday",
    hi: "86",
    lo: "55",
    weather: "Light Rain",
  },
  {
    day: "Tuesday",
    hi: "86",
    lo: "55",
    weather: "Partly Cloudy",
  },
];

export const weatherCodes: Record<number, { day: string; night: string }> = {
  1000: {
    day: "/assets/weatherIcons/clear-day.png",
    night: "/assets/weatherIcons/clear-night.png",
  },
  1003: {
    day: "/assets/weatherIcons/partly-cloudy-day.png",
    night: "/assets/weatherIcons/partly-cloudy-night.png",
  },
  1006: {
    day: "/assets/weatherIcons/cloudy.png",
    night: "/assets/weatherIcons/cloudy.png",
  },
  1009: {
    day: "/assets/weatherIcons/overcast.png",
    night: "/assets/weatherIcons/overcast.png",
  },
  1030: {
    day: "/assets/weatherIcons/fog.png",
    night: "/assets/weatherIcons/fog.png",
  },
  1063: {
    day: "/assets/weatherIcons/showers.png",
    night: "/assets/weatherIcons/showers.png",
  },
  1066: {
    day: "/assets/weatherIcons/snow.png",
    night: "/assets/weatherIcons/snow.png",
  },
  1069: {
    day: "/assets/weatherIcons/sleet.png",
    night: "/assets/weatherIcons/sleet.png",
  },
  1072: {
    day: "/assets/weatherIcons/sleet.png",
    night: "/assets/weatherIcons/sleet.png",
  },
  1087: {
    day: "/assets/weatherIcons/thunderstorm-showers.png",
    night: "/assets/weatherIcons/thunderstorm-showers.png",
  },
  1114: {
    day: "/assets/weatherIcons/heavy-snow.png",
    night: "/assets/weatherIcons/heavy-snow.png",
  },
  1117: {
    day: "/assets/weatherIcons/heavy-snow.png",
    night: "/assets/weatherIcons/heavy-snow.png",
  },
  1135: {
    day: "/assets/weatherIcons/fog.png",
    night: "/assets/weatherIcons/fog.png",
  },
  1147: {
    day: "/assets/weatherIcons/fog.png",
    night: "/assets/weatherIcons/fog.png",
  },
  1150: {
    day: "/assets/weatherIcons/showers.png",
    night: "/assets/weatherIcons/showers.png",
  },
  1153: {
    day: "/assets/weatherIcons/showers.png",
    night: "/assets/weatherIcons/showers.png",
  },
  1168: {
    day: "/assets/weatherIcons/sleet.png",
    night: "/assets/weatherIcons/sleet.png",
  },
  1171: {
    day: "/assets/weatherIcons/sleet.png",
    night: "/assets/weatherIcons/sleet.png",
  },
  1180: {
    day: "/assets/weatherIcons/showers.png",
    night: "/assets/weatherIcons/showers.png",
  },
  1183: {
    day: "/assets/weatherIcons/showers.png",
    night: "/assets/weatherIcons/showers.png",
  },
  1186: {
    day: "/assets/weatherIcons/showers.png",
    night: "/assets/weatherIcons/showers.png",
  },
  1189: {
    day: "/assets/weatherIcons/showers.png",
    night: "/assets/weatherIcons/showers.png",
  },
  1192: {
    day: "/assets/weatherIcons/heavy-showers.png",
    night: "/assets/weatherIcons/heavy-showers.png",
  },
  1195: {
    day: "/assets/weatherIcons/heavy-showers.png",
    night: "/assets/weatherIcons/heavy-showers.png",
  },
  1198: {
    day: "/assets/weatherIcons/sleet.png",
    night: "/assets/weatherIcons/sleet.png",
  },
  1201: {
    day: "/assets/weatherIcons/sleet.png",
    night: "/assets/weatherIcons/sleet.png",
  },
  1204: {
    day: "/assets/weatherIcons/sleet.png",
    night: "/assets/weatherIcons/sleet.png",
  },
  1207: {
    day: "/assets/weatherIcons/sleet.png",
    night: "/assets/weatherIcons/sleet.png",
  },
  1210: {
    day: "/assets/weatherIcons/snow.png",
    night: "/assets/weatherIcons/snow.png",
  },
  1213: {
    day: "/assets/weatherIcons/snow.png",
    night: "/assets/weatherIcons/snow.png",
  },
  1216: {
    day: "/assets/weatherIcons/snow.png",
    night: "/assets/weatherIcons/snow.png",
  },
  1219: {
    day: "/assets/weatherIcons/snow.png",
    night: "/assets/weatherIcons/snow.png",
  },
  1222: {
    day: "/assets/weatherIcons/heavy-snow.png",
    night: "/assets/weatherIcons/heavy-snow.png",
  },
  1225: {
    day: "/assets/weatherIcons/heavy-snow.png",
    night: "/assets/weatherIcons/heavy-snow.png",
  },
  1237: {
    day: "/assets/weatherIcons/heavy-sleet.png",
    night: "/assets/weatherIcons/heavy-sleet.png",
  },
  1240: {
    day: "/assets/weatherIcons/showers.png",
    night: "/assets/weatherIcons/showers.png",
  },
  1243: {
    day: "/assets/weatherIcons/heavy-showers.png",
    night: "/assets/weatherIcons/heavy-showers.png",
  },
  1246: {
    day: "/assets/weatherIcons/heavy-showers.png",
    night: "/assets/weatherIcons/heavy-showers.png",
  },
  1249: {
    day: "/assets/weatherIcons/sleet.png",
    night: "/assets/weatherIcons/sleet.png",
  },
  1252: {
    day: "/assets/weatherIcons/sleet.png",
    night: "/assets/weatherIcons/sleet.png",
  },
  1255: {
    day: "/assets/weatherIcons/snow.png",
    night: "/assets/weatherIcons/snow.png",
  },
  1258: {
    day: "/assets/weatherIcons/heavy-snow.png",
    night: "/assets/weatherIcons/heavy-snow.png",
  },
  1261: {
    day: "/assets/weatherIcons/heavy-sleet.png",
    night: "/assets/weatherIcons/heavy-sleet.png",
  },
  1264: {
    day: "/assets/weatherIcons/heavy-sleet.png",
    night: "/assets/weatherIcons/heavy-sleet.png",
  },
  1273: {
    day: "/assets/weatherIcons/thunderstorm-showers.png",
    night: "/assets/weatherIcons/thunderstorm-showers.png",
  },
  1276: {
    day: "/assets/weatherIcons/thunderstorm-showers.png",
    night: "/assets/weatherIcons/thunderstorm-showers.png",
  },
  1279: {
    day: "/assets/weatherIcons/thunderstorm-snow.png",
    night: "/assets/weatherIcons/thunderstorm-snow.png",
  },
  1282: {
    day: "/assets/weatherIcons/thunderstorm-snow.png",
    night: "/assets/weatherIcons/thunderstorm-snow.png",
  },
};

export default days;
