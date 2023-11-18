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

export const scrapeAsianMirrorNews = async (req, res) => {
  const pageNumber = parseInt(req.params.page);
  const limit = 10 * pageNumber;
  const offset = (pageNumber - 1) * 10;
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
