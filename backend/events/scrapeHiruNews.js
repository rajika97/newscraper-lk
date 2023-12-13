import axios from "axios";
import cheerio from "cheerio";

export const scrapeHiruNews = async (req, res) => {
  try {
    const pageNumber = parseInt(req.params.page);

    const response = await axios.get(
      `https://www.hirunews.lk/local-news.php?pageID=${pageNumber}`
    );

    const $ = cheerio.load(response.data);

    const data = $(".trending-section .row .column:nth-child(3)")
      .map((index, element) => ({
        _id: index + 1,
        title: $(element).find(".all-section-tittle a:nth-child(2)").text(),
        date: $(element).find(".middle-tittle-time").text(),
        link: $(element)
          .find(".all-section-tittle a:nth-child(2)")
          .attr("href"),
      }))
      .get();

    const images = $(".trending-section .row .column:nth-child(1)")
      .map((index, element) => ({
        image: $(element).find(".sc-image img").attr("src"),
      }))
      .get();

    const combined = data
      .map((title, i) => ({
        ...title,
        ...images[i],
      }))
      .map(({ _id, title, date, link, image }) => ({
        _id,
        title,
        date,
        link,
        image,
      }));

    res.json(combined);
  } catch (error) {
    console.error(error);
    res.send("Something went wrong!");
  }
};
