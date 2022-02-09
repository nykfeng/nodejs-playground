require("dotenv").config({ path: "./.env" }); // Need to put absolute path here this time, because this is a module js. geocode will be called by app
const axios = require("axios");

console.log(process.env.MAPBOX_API_KEY);

const geocode = async (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?${process.env.MAPBOX_API_KEY}`;

  try {
    const res = await axios(url);
    callback(undefined, {
      latitude: res.data.features[0].center[1],
      longitude: res.data.features[0].center[0],
      location: res.data.features[0].place_name,
    });
  } catch (error) {
    if (error) {
      callback("Unable to connect to server!", undefined);
    } else if (res.data.features.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    }
  }
};

module.exports = geocode;
