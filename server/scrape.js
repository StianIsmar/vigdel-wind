const puppeteer = require("puppeteer");
var { getTime } = require("./Time")


const scrapeAPI = async (req, res, next) => {
    const windUrl = req.scrapeUrls[0]
    const mswUrl = req.scrapeUrls[1]

    const waveSizeElement = '/html/body/div[1]/div[2]/div[2]/div/div[2]/div[2]/div[2]/div/div/div[1]/div/div[1]/div[1]/div/div[2]/ul[1]'
    const waterTempElement = '/html/body/div[1]/div[2]/div[2]/div/div[2]/div[2]/div[2]/div/div/div[1]/div/div[1]/div[1]/div/div[2]/ul[2]/li[4]/p/strong[2]'
    const airTempElement = '/html/body/div[1]/div[2]/div[2]/div/div[2]/div[2]/div[2]/div/div/div[1]/div/div[1]/div[1]/div/div[2]/ul[2]/li[4]/p/strong[1]'

    const instantWind = scrapeKystVarsel(windUrl)
    instantWind.then((windData) => {
        const waterTemp = scrapeMsw(mswUrl, [waterTempElement])
        waterTemp.then((waterTempData) => {
            const airTemp = scrapeMsw(mswUrl, [airTempElement])
            airTemp.then((airTempData) => {
                const wavesSize = scrapeMsw(mswUrl, waveSizeElement)
                wavesSize.then((wavesSizeData) => {

                    // parsing waveSizeData
                    var [minHeight, maxHeight] = (wavesSizeData.split('-'))
                    minHeight = minHeight.trim()
                    maxHeight = maxHeight.trim()
                    maxHeight = maxHeight.substring(0, maxHeight.length - 1);

                    const time = getTime()
                    const windSpeed = windData[1]["Value"]["Value"].toString()
                    const windDir = windData[0]["Value"]["Value"].toString()
                    const reponse = { currentwind: { 'time': time, 'windSpeed': windSpeed, 'windDir': windDir }, temperatures: { 'water': waterTempData, 'air': airTempData }, waveHeight: { 'min': minHeight, 'max': maxHeight } }
                    return res.send(reponse)
                })


            });
        })
    })
}

// Function scraping kystVarsel to get wind at Vigdel
const scrapeKystVarsel = async (windUrl) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(windUrl);
    var content = await page.content();
    const innerText = await page.evaluate(() => {
        return JSON.parse(document.querySelector("body").innerText);
    });

    const instantWind = innerText["Instantaneous"];
    await browser.close();
    return instantWind;
}

// Scrape MSW to get water temperature
const scrapeMsw = async (url, xPath) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url, { waitUntil: "networkidle2" });

    const res = await page
        .waitForXPath(xPath)
        .then(() => console.log('Got it!'));

    let [element] = await page.$x(xPath);
    let text = await page.evaluate(element => element.textContent, element);
    await browser.close();

    return text

}


module.exports = { scrapeAPI: scrapeAPI, scrapeMsw: scrapeMsw }