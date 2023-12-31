import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@mui/joy/Typography";
import { useNavigate } from "react-router-dom";
import { FaArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { FaRegArrowAltCircleRight } from "react-icons/fa";
import Spinner from "../Spinner";
import NewsCard from "../NewsCard";
import FloatingArrowButton from "../FloatingArrowButton";

const Section = ({ title, route }) => {
  const devUrl = import.meta.env.VITE_APP_DEV_URL || "http://localhost:3000";
  const prodUrl =
    import.meta.env.VITE_APP_PROD_URL || "https://newscraper-lk.vercel.app";
  const [loading, setLoading] = useState(false);
  const [newsList, setNewsList] = useState([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `${
          import.meta.env.VITE_APP_ENV === "production" ? prodUrl : devUrl
        }/${route}/${page}`
      )
      .then((res) => {
        setNewsList(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [page]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="pt-8">
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
      <FloatingArrowButton onClick={scrollToTop} />
    </section>
  );
};

export default Section;
