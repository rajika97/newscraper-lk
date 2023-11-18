import puppeteer from "puppeteer";

export const scrapeLiveAt8News = async (req, res) => {
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
      `https://liveat8.lk/page/${pageNumber}/?tags=hot-news&post_type=post`,
      {
        waitUntil: "networkidle0",
        timeout: 0,
      }
    );
    const data = await page.evaluate(() =>
      Array.from(document.querySelectorAll(".item"), (e, index) => {
        const titleElement = e.querySelector(".item-bot-content h3 a");
        const dateElement = e.querySelector(".item-bot-content .item-meta a");
        const linkElement = e.querySelector(".item-bot-content h3 a");
        const imageElement = e.querySelector(".sneeit-thumb-landscape img");

        return {
          _id: index + 1,
          title: titleElement ? titleElement.innerText : "",
          date: dateElement ? dateElement.innerText : "",
          link: linkElement ? linkElement.href : "",
          image: imageElement ? imageElement.src : "",
        };
      }).slice(5, 17)
    );
    res.json(data);
  } catch (error) {
    console.error(error);
    res.send("Something went wrong!");
  } finally {
    await browser.close();
  }
};
