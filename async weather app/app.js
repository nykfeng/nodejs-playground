const geocode = require("./modules/geocode.js");
const forecast = require("./modules/forecast.js");

const address = process.argv[2];

if (!address) {
  console.log("Please enter a location for weather.");
} else {
  geocode(address, (error, { latitude, longitude }) => {
    if (error) {
      return console.log("Geocode Error: ", error);
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return console.log("Forecast Error: ", error);
      }

      console.log(`Forecast data for << ${address} >>`, forecastData);
    });
  });
}
