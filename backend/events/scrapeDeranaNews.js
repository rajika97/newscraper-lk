import puppeteer from "puppeteer";

export const scrapeDeranaNews = async (req, res) => {
  const pageNumber = parseInt(req.params.page);
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
  });
  try {
    const page = await browser.newPage();
    await page.goto(
      `https://sinhala.adaderana.lk/sinhala-hot-news.php?pageno=${pageNumber}`,
      {
        waitUntil: "networkidle0",
        timeout: 0,
      }
    );

    const data = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".news-story"), (e, index) => ({
        _id: index + 1,
        title: e.querySelector(".story-text h2").innerText,
        date: e.querySelector(".story-text .comments span").innerText.slice(2),
        link: e.querySelector(".story-text a").href,
        image: e.querySelector(".story-text .thumb-image img").src,
      }))
    );
    res.json(data);
  } catch (error) {
    console.error(error);
    res.send("Something went wrong!");
  } finally {
    await browser.close();
  }
};
