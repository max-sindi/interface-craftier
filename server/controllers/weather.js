import unirest from "unirest";
// import citiesJson from 'cities.json';
const coordinates = require('capitals-coordinates').rawData;

export const get = (request, response) => {
  const domain = 'https://community-open-weather-map.p.rapidapi.com/weather'
  // console.log(request.originalUrl);
  const params = request.originalUrl.split('?')[1]
  console.log(params);
  unirest.get(`${domain}?${params}`)
    .header("X-RapidAPI-Host", "community-open-weather-map.p.rapidapi.com")
    .header("X-RapidAPI-Key", "c8ecac9531mshf9f3ef9fcc529e8p1d0b9fjsn6ebc074223c1")
    .end(function (result) {
      // console.log(result.status, result.headers, result.body);
      response.send(result.body)
    });
}

export const cities = (request, response) => {
  response.send(coordinates);
}