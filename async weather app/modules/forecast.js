require("dotenv").config({ path: "./.env" });
const axios = require("axios");

const forecast = async (latitude, longitude, callback) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.OPEN_WEATHER_API_KEY}`;

  try {
    const res = await axios(url);
    callback(
      undefined,
      `It is currently ${res.data.weather[0].description} at ${Math.floor(
        (res.data.main.temp - 273) * (9 / 5) + 32
      )} °F. It feels like ${Math.floor(
        (res.data.main.feels_like - 273) * (9 / 5) + 32
      )} °F.`
    );
  } catch (error) {
    if (error) {
      callback("Unable to connect to server!", undefined);
    } else if (!res.data.weather) {
      callback("Unable to find location. Try another search.", undefined);
    }
  }
};


module.exports = forecast;
