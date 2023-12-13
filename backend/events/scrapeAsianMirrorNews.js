import axios from "axios";
import cheerio from "cheerio";

export const scrapeAsianMirrorNews = async (req, res) => {
  try {
    const pageNumber = parseInt(req.params.page);
    const limit = 10 * pageNumber;
    const offset = (pageNumber - 1) * 10;

    const response = await axios.get(
      `https://sinhala.asianmirror.lk/news/local/?l=${offset}&r=${limit}`
    );

    const $ = cheerio.load(response.data);

    const data = $("#list .col-sm-6")
      .map((index, element) => ({
        _id: index + 1,
        title: $(element).find(".txtbox h3").text(),
        date: $(element).find(".txtbox .datemob").text(),
        link: $(element).find("a").attr("href"),
        image: $(element).find(".imgwrp img").attr("src").trim(),
      }))
      .get();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.send("Something went wrong!");
  }
};
