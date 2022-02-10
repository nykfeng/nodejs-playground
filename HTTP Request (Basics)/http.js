const https = require("https");

const url = "https://apis.tvmaze.com/search/shows?q=chernobyl";

const request = https.request(url, (response) => {
  let data = "";

  response.on("data", (chunk) => {
    data += chunk.toString();
    console.log(chunk);
  });

  response.on("end", () => {
    // console.log(data);
    const body = JSON.parse(data);
    console.log(body);
  });
});

request.on('error', (error)=> {
    console.log(error);
})


request.end();
