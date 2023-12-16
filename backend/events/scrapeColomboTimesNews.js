import axios from "axios";
import cheerio from "cheerio";

export const scrapeColomboTimesNews = async (req, res) => {
  try {
    const pageNumber = parseInt(req.params.page);

    const response = await axios.get(
      `https://colombotimes.lk/sinhala/allnews?q=${pageNumber}`
    );

    const $ = cheerio.load(response.data);

    const data = $(".post-list li")
      .map((index, element) => ({
        _id: index + 1,
        title: $(element).find(".post-content h2").text().trim(),
        date: $(element).find(".post-content .entry-meta").text().trim(),
        link: $(element).find(".post-content h2 a").attr("href"),
        image: $(element).find(".entry-header picture img").attr("src"),
      }))
      .get();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.send("Something went wrong!");
  }
};
