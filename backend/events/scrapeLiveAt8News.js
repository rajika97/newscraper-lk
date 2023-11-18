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

export const scrapeLiveAt8News = async (req, res) => {
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
