import axios from "axios";
import cheerio from "cheerio";

export const scrapeLankadeepaNews = async (req, res) => {
  try {
    const pageNumber = parseInt(req.params.page);

    const response = await axios.get(
      `https://www.lankadeepa.lk/latest-news/1/${(pageNumber - 1) * 30}`
    );

    const $ = cheerio.load(response.data);

    const data = $(".flex-wr-sb-s")
      .map((index, element) => ({
        _id: index + 1,
        title: $(element).find(".size-w-9 h5").text().trim().split("\t")[0],
        date: $(element)
          .find(".size-w-9 .cl8 span")
          .text()
          .trim()
          .split("\t")[0],
        link: $(element).find(".size-w-9 h5 a").attr("href"),
        image: $(element).find(".size-w-8 img").attr("src"),
      }))
      .get();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.send("Something went wrong!");
  }
};
