import axios from "axios";
import cheerio from "cheerio";

export const scrapeDivainaNews = async (req, res) => {
  try {
    const pageNumber = parseInt(req.params.page);

    const response = await axios.get(
      `https://divaina.lk/category/main-news/page/${pageNumber}`
    );

    const $ = cheerio.load(response.data);

    const data = $(".tdb_module_loop")
      .map((index, element) => ({
        _id: index + 1,
        title: $(element).find(".td-module-meta-info h3").text().trim(),
        date: $(element)
          .find(".td-module-meta-info .td-editor-date time")
          .text()
          .trim(),
        link: $(element).find(".td-module-meta-info h3 a").attr("href"),
        image: $(element).find(".td-image-container span").attr("data-bg"),
      }))
      .get();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.send("Something went wrong!");
  }
};
