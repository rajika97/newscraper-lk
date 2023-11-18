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

export const scrapeDeranaNews = async (req, res) => {
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
