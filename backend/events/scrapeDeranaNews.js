import axios from "axios";
import cheerio from "cheerio";

export const scrapeDeranaNews = async (req, res) => {
  try {
    const pageNumber = parseInt(req.params.page);

    const response = await axios.get(
      `https://sinhala.adaderana.lk/sinhala-hot-news.php?pageno=${pageNumber}`
    );

    const $ = cheerio.load(response.data);

    const data = $(".news-story")
      .map((index, element) => ({
        _id: index + 1,
        title: $(element).find(".story-text h2").text().trim(),
        date: $(element)
          .find(".story-text .comments span")
          .text()
          .slice(2)
          .trim(),
        link: `https://sinhala.adaderana.lk/${$(element)
          .find(".story-text a")
          .attr("href")}`,
        image: $(element).find(".story-text .thumb-image img").attr("src"),
      }))
      .get();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.send("Something went wrong!");
  }
};
