import puppeteer from "puppeteer";

export const scrapeHiruNews = async (req, res) => {
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
      `https://www.hirunews.lk/local-news.php?pageID=${pageNumber}`,
      {
        waitUntil: "networkidle0",
        timeout: 0,
      }
    );

    const data = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          ".trending-section .row .column:nth-child(3)"
        ),
        (e, index) => ({
          _id: index + 1,
          title: e.querySelector(".all-section-tittle a:nth-child(2)")
            .innerText,
          date: e.querySelector(".middle-tittle-time").innerText,
          link: e.querySelector(".all-section-tittle a:nth-child(2)").href,
        })
      )
    );

    const images = await page.evaluate(() =>
      Array.from(
        document.querySelectorAll(
          ".trending-section .row .column:nth-child(1)"
        ),
        (e) => ({
          image: e.querySelector(".sc-image img").src,
        })
      )
    );
    const combined = data
      .map((title, i) => ({ ...title, ...images[i] }))
      .map(({ _id, title, date, link, image }) => ({
        _id,
        title,
        date,
        link,
        image,
      }));

    res.json(combined);
  } catch (error) {
    console.error(error);
    res.send("Something went wrong!");
  } finally {
    await browser.close();
  }
};
