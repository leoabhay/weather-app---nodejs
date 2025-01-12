const express = require("express");
const axios = require("axios");
const app = express();

// load the environment variable
require('dotenv').config();

// set the view engine to ejs
app.set("view engine", "ejs");

// serve the public folder as static files
app.use(express.static("public"));

// render the index template with default values for weather and error
app.get("/", (req, res) => {
  res.render("index", { weather: null, error: null });
});

// handle the weather route
app.get("/weather", async (req, res) => {
  // get the city from the query parameters
  const city = req.query.city;
  const apiKey = "835f59d2288a056992289cdf4aa8433d" ;

  // add your logic here to fetch weather data from the API
  const APIUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  let weather;
  let error = null;
  try {
    const response = await axios.get(APIUrl);
    weather = response.data;
  } catch (error) {
    weather = null;
    error = "Error, Please try again";
  }
  // render the index template with the weather data and error message
  res.render("index", { weather, error });
});

// server connection
const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});