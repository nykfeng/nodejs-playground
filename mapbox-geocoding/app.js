const { default: axios } = require("axios");

const geocodingUrl = `https://api.mapbox.com/geocoding/v5/mapbox.places/Los%20Angeles.json?access_token=pk.eyJ1IjoibnlrZmVuZyIsImEiOiJja3plY2szcjkzNTE2MzBwdnBieno2dzdsIn0.-di7rtOp_Iv7lxlIRDAwX`;

const getInfo = async function () {
  try {
    const res = await axios(geocodingUrl);
    console.log(res.data.features[0].center);
  } catch (error) {
    if (error) {
      console.log("Unable to connect to server!");
      console.log(error.response.status);
      //   console.log(error.request);
    }
  }
};

// const getData = async function () {
//   const res = await axios.get(geocodingUrl).catch(function (error) {
//     if (error) {
//       console.log("Unable to connect to server!");
//     }
//   });
//   console.log(res.data.features[0].center);
// };

// console.log();

// getData();

getInfo();

const geocode = (address, callback) => {
    setTimeout(()=> {
        const data = {
            latitude: 0,
            longitude: 0
        }
        callback(data);
    },2000)
}

geocode("Philadelphia", (data)=> {
    console.log(data);
})

const add = ((x,y, callback)=> {
    setTimeout(()=> {
        callback(x+y);
    },2000)
})

add(1, 4, (sum) => {
    console.log(sum);
})