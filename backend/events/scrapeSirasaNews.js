import axios from "axios";

export const scrapeSirasaNews = async (req, res) => {
  try {
    const pageNumber = parseInt(req.params.page);

    const response = await axios.get(
      `https://apisinhala.newsfirst.lk/post/PostPagination/${pageNumber}/10/`
    );

    const data = response.data.postResponseDto.map((element, index) => ({
      _id: index + 1,
      title: element.title.rendered,
      date: element.date.replace("T", " "),
      link: `https://sinhala.newsfirst.lk/${element.post_url}`,
      image: element.images.post_thumb,
    }));

    res.json(data);
  } catch (error) {
    console.error(error);
    res.send("Something went wrong!");
  }
};
