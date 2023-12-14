import axios from "axios";
import cheerio from "cheerio";

export const scrapeNethNews = async (req, res) => {
  try {
    const pageNumber = parseInt(req.params.page);

    const response = await axios.get(
      `https://nethnews.lk/category/5?page=${pageNumber}`
    );

    const $ = cheerio.load(response.data);

    const data = $(".breaking_news")
      .map((index, element) => {
        const title = $(element).find(".col-sm-9 h3").text().trim();
        const date = $(element)
          .find(".gossip_publish_div .publish_date")
          .text()
          .trim();
        const link = $(element).find(".col-sm-9 h3 a").attr("href");
        const image = $(element).find(".col-sm-3 img").attr("src");

        // Check if "image" has a truthy value before adding to "data"
        if (image) {
          return {
            _id: index + 1,
            title,
            date,
            link,
            image,
          };
        }

        return null;
      })
      .get()
      .filter(Boolean);

    res.json(data);
  } catch (error) {
    console.error(error);
    res.send("Something went wrong!");
  }
};
