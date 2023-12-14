import axios from "axios";
import cheerio from "cheerio";

export const scrapeAdaNews = async (req, res) => {
  try {
    const pageNumber = parseInt(req.params.page);

    const response = await axios.get(
      `https://www.ada.lk/latest-news/11/${(pageNumber - 1) * 30}`
    );

    const $ = cheerio.load(response.data);

    const data = $(".row .row")
      .map((index, element) => {
        const title = $(element).find(".cat-detail-1 h5").text().trim();
        const date = $(element).find(".cat-detail-1 h6").text().trim();
        const link = $(element).find(".cat-image a").attr("href");
        const image = $(element).find(".cat-image img").attr("src");

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
