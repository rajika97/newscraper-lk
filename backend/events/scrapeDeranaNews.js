import puppeteer from "puppeteer";
import { deranaNewsModel } from "../models.js";

async function scrapeDeranaNews() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--disable-setuid-sandbox",
      "--no-sandbox",
      "--single-process",
      "--no-zygote",
    ],
    executablePath:
      process.env.NODE_ENV === "production"
        ? process.env.PUPPETEER_EXECUTABLE_PATH
        : puppeteer.executablePath(),
    // `headless: true` (default) enables old Headless;
    // `headless: 'new'` enables new Headless;
    // `headless: false` enables “headful” mode.
  });
  const page = await browser.newPage();
  await page.goto("https://sinhala.adaderana.lk/sinhala-hot-news.php", {
    waitUntil: "networkidle0",
    timeout: 0,
  });

  const data = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".news-story"), (e) => ({
      title: e.querySelector(".story-text h2").innerText,
      date: e.querySelector(".story-text .comments span").innerText.slice(2),
      link: e.querySelector(".story-text a").href,
      image: e.querySelector(".story-text .thumb-image img").src,
    }))
  );

  await browser.close();

  // Check if there are any new items in the database
  const existingData = await deranaNewsModel.find({});
  const newItems = data.filter((item) => {
    return !existingData.some((existingItem) => {
      return existingItem.link === item.link;
    });
  });

  // If there are new items, add them to the database
  if (newItems.length > 0) {
    await deranaNewsModel.insertMany(newItems);
    console.log("New data added to Derana News table in MongoDB");
  }
}

export default scrapeDeranaNews;
