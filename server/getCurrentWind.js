const { scrapeAPI, scrapeMsw } = require('./scrape')
var { getTime } = require("./Time")

const scrapeCurrentWind = (req, res) => {
    const instantWind = scrapeAPI(
        "http://mobvaer.kystverket.no/v2/api/stations/5265049",
        "https://magicseaweed.com/Bore-Surf-Report/1886/"
    );
    instantWind.then((result) => {
        const time = getTime()
        const windSpeed = result[1]["Value"]["Value"].toString()
        const windDir = result[0]["Value"]["Value"].toString()
        const reponse = { currentwind: { 'time': time, 'windSpeed': windSpeed, 'windDir': windDir } }
        return res.send(reponse)
    });

}
const scrapeCurrentWaves = (req, res) => {
    const instantWaves = scrapeMsw('https://magicseaweed.com/Bore-Surf-Report/1886/'
    );
    //'/html/body/div[1]/div[2]/div[2]/div/div[2]/div[2]/div[2]/div/div/div[1]/div/div[1]/div[2]/div/div[2]/div/div[2]/table'
    instantWaves.then((result) => {
        const time = getTime()
        return res.send(result)
    });

}

module.exports = {
    scrapeCurrentWind: scrapeCurrentWind,
    scrapeCurrentWaves: scrapeCurrentWaves
}