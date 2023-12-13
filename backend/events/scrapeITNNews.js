import axios from "axios";
import cheerio from "cheerio";

export const scrapeITNNews = async (req, res) => {
  try {
    const pageNumber = parseInt(req.params.page);

    const response = await axios.get(
      `https://www.itnnews.lk/local/page/${pageNumber}/`
    );

    const $ = cheerio.load(response.data);

    // Extracting data
    const data = $(".article-big")
      .map((index, element) => {
        const title = $(element).find(".article-content h2").text();
        const rawDate = $(element).find(".article-content .meta a").text();
        const date = extractFormattedDate(rawDate);
        const link = $(element).find(".article-content h2 a").attr("href");
        const image = $(element).find(".article-photo img").attr("data-src");

        return {
          _id: index + 1,
          title,
          date,
          link,
          image,
        };
      })
      .get();

    res.json(data);
  } catch (error) {
    console.error(error);
    res.send("Something went wrong!");
  }
};

// Function to extract formatted date using regular expressions
function extractFormattedDate(rawDate) {
  const match = rawDate.match(/(\d{2}:\d{2}, \d+\.\S+\. \d{4})/);
  return match ? match[0] : "";
}
