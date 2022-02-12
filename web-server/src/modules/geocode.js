require("dotenv").config({ path: "./.env" }); 
const axios = require("axios");

const geocode = async (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?${process.env.MAPBOX_API_KEY}`;
  console.log("geocode url", url);

  try {
    const res = await axios(url);
    const coord = res.data.features;
    callback(
      undefined,
      ({
        latitude: coord[0].center[1],
        longitude: coord[0].center[0],
        location: coord[0].place_name,
      })
    );
  } catch (error) {
    if (error.status == 401) {
      callback("Unable to connect to geocode server!", undefined);
    } else  {
      callback("Unable to find location. Try another search.", undefined);
    }
  }
};

module.exports = geocode;
