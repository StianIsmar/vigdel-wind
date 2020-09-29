"use strict";

var express = require("express");
var app = express();
var { getWindForecast, storeWindData } = require("./kystScrape");

var { getWind } = require('./getWind')

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


app.listen(3002, () => {
  console.log("Server running on port 3000");
});
