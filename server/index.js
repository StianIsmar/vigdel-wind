"use strict";

const cors = require('cors');


var express = require("express");
var app = express();
app.use(cors())

var { getWindForecast, storeWindData } = require("./storeDataToDb");

var { getWind } = require('./getWind')
var {scrapeCurrentWind} = require('./getCurrentWind')

app.get("/readwind", startCalls, getWindForecast, storeWindData);

function startCalls(req, res, next) {
  // res.json(["Tony", "Lisa", "Michael", "Ginger", "Food"]);
  try {
    next()

  } catch {
    console.log("This did not work out");
  }
};

app.get("/getwind", getWind);



app.get("/getcurrentwind", scrapeCurrentWind);


app.listen(3002, () => {
  console.log("Server running on port 3000");
});
