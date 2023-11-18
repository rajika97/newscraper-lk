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

export const scrapeITNNews = async (req, res) => {
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
