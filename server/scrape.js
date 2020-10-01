const puppeteer = require("puppeteer");

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

module.exports = {scrapeAPI: scrapeAPI}