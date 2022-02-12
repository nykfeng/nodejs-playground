const weatherForm = document.querySelector("form");
const search = document.querySelector("input");

const locationEl = document.querySelector("p.location");
const forecastEl = document.querySelector("p.forecast");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const location = search.value;
  console.log(location);

  fetch(`/weather?address=${location}`).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        console.log(data.error);
        locationEl.textContent = data.error;
      } else {
        console.log(data.location);
        locationEl.textContent = data.location;
        console.log(data.forecast);
        forecastEl.textContent = data.forecast;
      }
    });
  });
});
