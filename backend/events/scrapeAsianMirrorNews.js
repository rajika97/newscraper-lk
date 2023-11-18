import puppeteer from "puppeteer";

export const scrapeAsianMirrorNews = async (req, res) => {
  const pageNumber = parseInt(req.params.page);
  const limit = 10 * pageNumber;
  const offset = (pageNumber - 1) * 10;
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
      `https://sinhala.asianmirror.lk/news/local/?l=${offset}&r=${limit}`,
      {
        waitUntil: "networkidle0",
        timeout: 0,
      }
    );

    const data = await page.evaluate(() =>
      Array.from(document.querySelectorAll("#list .col-sm-6"), (e, index) => ({
        _id: index + 1,
        title: e.querySelector(".txtbox h3").innerText,
        date: e.querySelector(".txtbox .datemob").innerText,
        link: e.querySelector("a").href,
        image: e.querySelector(".imgwrp img").src,
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
