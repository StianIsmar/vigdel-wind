const puppeteer = require("puppeteer");

const scrapeAPI = async (windUrl, mswUrl) => {
    const instantWind = await scrapeKystVarsel(windUrl)

    // const waveElement = '/html/body/div[1]/div[2]/div[2]/div/div[2]/div[2]/div[2]/div/div/div[1]/div/div[1]/div[1]/div/div[2]/ul[1]'
    const waterTempElement = '/html/body/div[1]/div[2]/div[2]/div/div[2]/div[2]/div[2]/div/div/div[1]/div/div[1]/div[1]/div/div[2]/ul[2]/li[4]/p/strong[2]'
    const airTempElement = '/html/body/div[1]/div[2]/div[2]/div/div[2]/div[2]/div[2]/div/div/div[1]/div/div[1]/div[1]/div/div[2]/ul[2]/li[4]/p/strong[1]'

    const waterTemp = await scrapeMsw(mswUrl, waterTempElement)
    const airTemp = await scrapeMsw(mswUrl, airTempElement)

    console.log(instantWind)

    return instantWind;
};
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