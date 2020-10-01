const puppeteer = require("puppeteer");

var { getTime } = require("./Time")

var { connectToSql } = require('./connect')

// Function to scrape the API
const scrapeAPI = async (url) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);
  var content = await page.content();
  const innerText = await page.evaluate(() => {
    return JSON.parse(document.querySelector("body").innerText);
  });

  const instantWind = innerText["Instantaneous"];
  await browser.close();
  return instantWind;
};

/* 
  This function performs the SQL query to fill up the DB. It is triggered every time new wind data is received
*/
const storeWindData = (req, res, next) => {
  // parse data
  const time = req.time
  const windSpeed = req.result[1]["Value"]["Value"].toString()
  const windDir = req.result[0]["Value"]["Value"].toString()

  if(req.updatedSpeed){
    console.log("req.updatedSpeed IS NOW TRUE")
  }

  //console.log("WINDSPEED", windSpeed)
  //console.log("req.time", req.time.toString())

  const { config, sql } = connectToSql()
  sql.connect(config, function (err) {
    if (err) console.log(err);

    // create Request object
    var request = new sql.Request();
    // request.query('SELECT TOP (1000) * FROM wind', function (err, recordset) {
  
    const sqlQuery = `INSERT INTO wind (RecordedTime,WindDirection,WindStrength) \n VALUES ('${time}', '${windDir}', '${windSpeed}')`

    request.query(sqlQuery, function (err, recordset) {

      if (err) console.log(err)

    // send records as a response
    return res.send(recordset);
    sql.close()
  });
});
}
/*
  This function scrapes the API and includes logic for passing on the data
*/
const getWindForecast = (req, res, next) => {
  var windRecordings = []

  setInterval(() => {
    const instantWind = scrapeAPI(
      "http://mobvaer.kystverket.no/v2/api/stations/5265049"
    );
    instantWind.then((result) => {
      var scrapedWind = result[1]["Value"]["Value"]
      console.log("This is the NEWLY scraped wind: ", scrapedWind)

      const time = getTime()
      req.time = time
      req.updatedSpeed = false

      if (windRecordings.length > 0) {
        // A wind value(s) is already pushed to the list
        var latestSavedWind = windRecordings[windRecordings.length - 1]; // get the latest element out

        // Compare the lates wind value in the list to the lates API request wind value
        console.log("OLD: ", latestSavedWind[1]["Value"]["Value"])
        console.log("NEW: ", result[1]["Value"]["Value"])
        if (
          latestSavedWind[1]["Value"]["Value"] == result[1]["Value"]["Value"]
        ) {
          console.log("They are the same");
        } else {
          console.log(time, "They are not the same, push them.")
          windRecordings.push(result);
          //req.result = result

          // storeWindData() // store in DB
          req.updatedSpeed = true
          next()

        }
      } else {
        // The length is less than 0, no element has been added so far, push element
        console.log("Push the first to the list");

        // storeWindData(res)
        req.result = result
        next()
        windRecordings.push(result); // store in DB
      }
    });

  }, 2000);
  // return windRecordings;
};

module.exports = {
  getWindForecast: getWindForecast, storeWindData: storeWindData
};
// This is every 10 mins: 600000

