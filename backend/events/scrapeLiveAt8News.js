import axios from "axios";
import cheerio from "cheerio";

export const scrapeLiveAt8News = async (req, res) => {
  try {
    const pageNumber = parseInt(req.params.page);

    const response = await axios.get(
      `https://liveat8.lk/page/${pageNumber}/?tags=hot-news&post_type=post`
    );

    const $ = cheerio.load(response.data);

    // Extracting data
    const data = $(".item")
      .slice(5, 17)
      .map((index, element) => {
        const titleElement = $(element).find(".item-bot-content h3 a");
        const dateElement = $(element).find(".item-bot-content .item-meta a");
        const linkElement = $(element).find(".item-bot-content h3 a");
        const imageElement = $(element).find(".sneeit-thumb img");

        return {
          _id: index + 1,
          title: titleElement.text(),
          date: dateElement.text(),
          link: linkElement.attr("href"),
          image: imageElement.attr("data-s"),
        };
      })
      .get();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.send("Something went wrong!");
  }
};
