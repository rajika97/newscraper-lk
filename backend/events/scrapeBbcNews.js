import axios from "axios";
import cheerio from "cheerio";

export const scrapeBbcNews = async (req, res) => {
  try {
    const pageNumber = parseInt(req.params.page);

    const response = await axios.get(
      `https://www.bbc.com/sinhala/topics/cg7267dz901t?page=${pageNumber}`
    );

    const $ = cheerio.load(response.data);

    const data = $(".bbc-t44f9r")
      .map((index, element) => ({
        _id: index + 1,
        title: $(element).find(".promo-text h2").text().trim(),
        date: $(element).find(".promo-text time").text().trim(),
        link: $(element).find(".promo-text h2 a").attr("href"),
        image: $(element).find(".promo-image img").attr("src"),
      }))
      .get();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.send("Something went wrong!");
  }
};
