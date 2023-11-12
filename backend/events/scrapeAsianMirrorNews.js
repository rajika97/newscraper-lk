import puppeteer from "puppeteer";
import { asianMirrorNewsModel } from "../models.js";

async function scrapeAsianMirrorNews() {
  // Scrape Asian Mirror News and obtain data
  const browser = await puppeteer.launch({
    headless: "new",
    // `headless: true` (default) enables old Headless;
    // `headless: 'new'` enables new Headless;
    // `headless: false` enables “headful” mode.
  });
  const page = await browser.newPage();
  await page.goto("https://sinhala.asianmirror.lk/news/local/", {
    waitUntil: "networkidle0",
    timeout: 0,
  });

  const data = await page.evaluate(() =>
    Array.from(document.querySelectorAll("#list .col-sm-6"), (e) => ({
      title: e.querySelector(".txtbox h3").innerText,
      date: e.querySelector(".txtbox .datemob").innerText,
      link: e.querySelector("a").href,
      image: e.querySelector(".imgwrp img").src,
    }))
  );

  await browser.close();

  // Check if there are any new items in the database
  const existingData = await asianMirrorNewsModel.find({});
  const newItems = data.filter((item) => {
    return !existingData.some((existingItem) => {
      return existingItem.link === item.link;
    });
  });

  // If there are new items, add them to the database
  if (newItems.length > 0) {
    await asianMirrorNewsModel.insertMany(newItems);
    console.log("New data added to Asian Mirror News table in MongoDB");
  }
}

export default scrapeAsianMirrorNews;
