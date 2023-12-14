import axios from "axios";
import cheerio from "cheerio";

export const scrapeLankaTruthNews = async (req, res) => {
  try {
    const pageNumber = parseInt(req.params.page);

    const response = await axios.get(
      `https://lankatruth.com/si/?paged=${pageNumber}&cat=2`
    );

    const $ = cheerio.load(response.data);

    const data = $(".elementor-post")
      .map((index, element) => ({
        _id: index + 1,
        title: $(element)
          .find(".elementor-post__text .elementor-post__title")
          .text()
          .trim(),
        date: $(element)
          .find(".elementor-post__meta-data .elementor-post-date")
          .text()
          .trim(),
        link: $(element)
          .find(".elementor-post__text .elementor-post__title a")
          .attr("href"),
        image: $(element)
          .find(
            ".elementor-post__thumbnail__link .elementor-post__thumbnail img"
          )
          .attr("src"),
      }))
      .get();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.send("Something went wrong!");
  }
};
