require("dotenv").config({ path: "../.env" }); // Need to put absolute path here this time, because this is a module js. geocode will be called by app
const axios = require("axios");


const geocode = async (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?${process.env.MAPBOX_API_KEY}`;

  try {
    const res = await axios(url);
    const coord = res.data.features;
    callback(undefined, {
      latitude: coord[0].center[1],
      longitude: coord[0].center[0],
      location: coord[0].place_name,
    });
  } catch (error) {
    if (error) {
      callback("Unable to connect to server!", undefined);
    } else if (coord.length === 0) {
      callback("Unable to find location. Try another search.", undefined);
    }
  }
};

module.exports = geocode;
