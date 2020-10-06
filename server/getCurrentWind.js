const { scrapeAPI, scrapeMsw } = require('./scrape')
var { getTime } = require("./Time")

const scrapeCurrentWind = async (req, res, then) => {
    req.scrapeUrls = ["http://mobvaer.kystverket.no/v2/api/stations/5265049",
    "https://magicseaweed.com/Bore-Surf-Report/1886/"]
    then()
    
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