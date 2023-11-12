import puppeteer from "puppeteer";
import { itnNewsModel } from "../models.js";

async function scrapeITNNews() {
  const browser = await puppeteer.launch({
    headless: "new",
    // `headless: true` (default) enables old Headless;
    // `headless: 'new'` enables new Headless;
    // `headless: false` enables “headful” mode.
  });
  const page = await browser.newPage();
  await page.goto("https://www.itnnews.lk/local/", {
    waitUntil: "networkidle0",
    timeout: 0,
  });

  const data = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".article-big"), (e) => ({
      title: e.querySelector(".article-content h2").innerText,
      date: e.querySelector(".article-content .meta a").innerText,
      link: e.querySelector(".article-content h2 a").href,
      image: e.querySelector(".article-photo img").src,
    })).slice(0, 3)
  );

  await browser.close();

  // Check if there are any new items in the database
  const existingData = await itnNewsModel.find({});
  const newItems = data.filter((item) => {
    return !existingData.some((existingItem) => {
      return existingItem.link === item.link;
    });
  });

  // If there are new items, add them to the database
  if (newItems.length > 0) {
    await itnNewsModel.insertMany(newItems);
    console.log("New data added to ITN News table in MongoDB");
  }
}

export default scrapeITNNews;
