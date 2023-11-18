import puppeteerBrowser from "puppeteer";
import puppeteerCore from "puppeteer-core";
import chromeAwsLambda from "chrome-aws-lambda";

let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = chromeAwsLambda;
  puppeteer = puppeteerCore;
} else {
  puppeteer = puppeteerBrowser;
}

export const scrapeHiruNews = async (req, res) => {
  const pageNumber = parseInt(req.params.page);
  let options = { headless: "new" };

  if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
    options = {
      args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
      defaultViewport: chrome.defaultViewport,
      executablePath: await chrome.executablePath,
      headless: true,
      ignoreHTTPSErrors: true,
    };
  }

  const browser = await puppeteer.launch(options);
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
