import puppeteer from "puppeteer";
import { sirasaNewsModel } from "../models.js";

async function scrapeSirasaNews() {
  const browser = await puppeteer.launch({
    headless: "new",
    // `headless: true` (default) enables old Headless;
    // `headless: 'new'` enables new Headless;
    // `headless: false` enables “headful” mode.
  });
  const page = await browser.newPage();

  await page.goto("https://sinhala.newsfirst.lk/latest", {
    waitUntil: "networkidle0",
    timeout: 0,
  });

  const data = await page.evaluate(() => {
    const titles = Array.from(
      document.querySelectorAll(".lap_news_div .local_news_main h2")
    );
    const dates = Array.from(
      document.querySelectorAll(".lap_news_div .local_news_main .time_date")
    );
    const links = Array.from(
      document.querySelectorAll(".lap_news_div .local_news_main a")
    );
    const images = Array.from(
      document.querySelectorAll(".lap_news_div .local_news_main img")
    );
    return titles.map((el, i) => {
      return {
        title: el.textContent,
        date: dates[i].textContent,
        link: links[i].href,
        image: images[i].src,
      };
    });
  });

  await browser.close();

  // Check if there are any new items in the database
  const existingData = await sirasaNewsModel.find({});
  const newItems = data.filter((item) => {
    return !existingData.some((existingItem) => {
      return existingItem.link === item.link;
    });
  });

  // If there are new items, add them to the database
  if (newItems.length > 0) {
    await sirasaNewsModel.insertMany(newItems);
    console.log("New data added to Sirasa News table in MongoDB");
  }
}

export default scrapeSirasaNews;
