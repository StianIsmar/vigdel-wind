"use strict";

const cors = require('cors');


var express = require("express");
var app = express();
app.use(cors())

var { scrapeCurrentWind, scrapeCurrentWaves } = require('./getCurrentWind')

var { getWindForecast, storeWindData } = require("./storeDataToDb");

var { getWind } = require('./getWind')

app.get("/getcurrentwind", scrapeCurrentWind);
app.get("/getcurrentwaves", scrapeCurrentWaves);

// the endpoint underneath are not used
app.get("/readwind", startCalls, getWindForecast, storeWindData);

function startCalls(req, res, next) {
  try {
    next()

  } catch {
    console.log("This did not work out");
  }
};

app.get("/getwind", getWind);





app.listen(3002, () => {
  console.log("Server running on port 3000");
});
