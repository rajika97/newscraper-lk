import puppeteer from "puppeteer";
import { hiruNewsModel } from "../models.js";

async function scrapeHiruNews() {
  // Scrape Hiru News and obtain data
  const browser = await puppeteer.launch({
    headless: "new",
    // `headless: true` (default) enables old Headless;
    // `headless: 'new'` enables new Headless;
    // `headless: false` enables “headful” mode.
  });
  const page = await browser.newPage();
  await page.goto("https://www.hirunews.lk/local-news.php?pageID=1", {
    waitUntil: "networkidle0",
    timeout: 0,
  });

  const titles = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(".trending-section .row .column:nth-child(3)"),
      (e) => ({
        title: e.querySelector(".all-section-tittle a:nth-child(2)").innerText,
        date: e.querySelector(".middle-tittle-time").innerText,
        link: e.querySelector(".all-section-tittle a:nth-child(2)").href,
      })
    )
  );

  const images = await page.evaluate(() =>
    Array.from(
      document.querySelectorAll(".trending-section .row .column:nth-child(1)"),
      (e) => ({
        image: e.querySelector(".sc-image img").src,
      })
    )
  );
  const combined = titles
    .map((title, i) => ({ ...title, ...images[i] }))
    .map(({ title, date, link, image }) => ({ title, date, link, image }));
  //   console.log(combined);

  await browser.close();

  // Check if there are any new items in the database
  const existingData = await hiruNewsModel.find({});
  const newItems = combined.filter((item) => {
    return !existingData.some((existingItem) => {
      return existingItem.link === item.link;
    });
  });

  // If there are new items, add them to the database
  if (newItems.length > 0) {
    await hiruNewsModel.insertMany(newItems);
    console.log("New data added to Hiru News table in MongoDB");
  }
}

export default scrapeHiruNews;
