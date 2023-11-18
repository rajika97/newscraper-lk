import puppeteer from "puppeteer";

export const scrapeITNNews = async (req, res) => {
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
    await page.goto(`https://www.itnnews.lk/local/page/${pageNumber}/`, {
      waitUntil: "networkidle0",
      timeout: 0,
    });
    // Scroll to the bottom of the page
    await page.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 100;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 100);
      });
    });

    const data = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".article-big"), (e, index) => ({
        _id: index + 1,
        title: e.querySelector(".article-content h2").innerText,
        date: e.querySelector(".article-content .meta a").innerText,
        link: e.querySelector(".article-content h2 a").href,
        image: e.querySelector(".article-photo img").src,
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
