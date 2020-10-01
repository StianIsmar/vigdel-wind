const { scrapeAPI } = require('./scrape')
var { getTime } = require("./Time")

const scrapeCurrentWind = (req, res) => {
    const instantWind = scrapeAPI(
        "http://mobvaer.kystverket.no/v2/api/stations/5265049"
    );
    instantWind.then((result) => {
        const time = getTime()
        const windSpeed = result[1]["Value"]["Value"].toString()
        const windDir = result[0]["Value"]["Value"].toString()
        const reponse = { 'time': time, 'windSpeed': windSpeed, 'windDir': windDir }
        return res.send(reponse)
    });

}

module.exports = { scrapeCurrentWind: scrapeCurrentWind }