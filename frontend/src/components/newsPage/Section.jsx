import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@mui/joy/Typography";
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import Spinner from "../Spinner";
import NewsCard from "../NewsCard";

const Section = ({ title, route }) => {
  const devUrl = "http://localhost:3000";
  const [loading, setLoading] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${devUrl}/${route}/${page}`)
      .then((res) => {
        setNewsList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [page]);

  return (
    <section className="py-8">
      <div className="flex items-center">
        <button onClick={() => navigate("/")} className="pr-6 btn-large">
          <FaArrowAltCircleLeft size={32} />
        </button>

        <Typography level="h1" noWrap={false} variant="plain">
          {title}
        </Typography>
      </div>

      {loading && <Spinner />}

      <div className="flex flex-wrap overflow-y-auto mt-6">
        {newsList.map((news) => (
          <NewsCard
            key={news._id}
            title={news.title}
            image={news.image}
            date={news.date}
            link={news.link}
          />
        ))}
      </div>
      <div className="flex justify-center items-center pb-2">
        <Typography level="title-lg" noWrap={false} variant="plain">
          Page: {page}
        </Typography>
      </div>
      <div className="flex justify-center items-center gap-2">
        <button
          onClick={() => {
            setPage(page - 1);
            window.scrollTo(0, 0);
          }}
          className="btn-large"
          disabled={page === 1}
        >
          <FaRegArrowAltCircleLeft
            size={24}
            color={page === 1 ? "gray" : "black"}
          />
        </button>
        <Typography level="body-lg" noWrap={false} variant="plain">
          Back
        </Typography>

        <Typography level="body-lg" noWrap={false} variant="plain">
          Next
        </Typography>
        <button
          onClick={() => {
            setPage(page + 1);
            window.scrollTo(0, 0);
          }}
          className="pr-2 btn-large"
        >
          <FaRegArrowAltCircleRight size={24} />
        </button>
      </div>
    </section>
  );
};

export default Section;
