import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@mui/joy/Typography";
import { FaArrowAltCircleRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CardList from "./CardList";
import Spinner from "./Spinner";

const NewsSection = ({ title, route }) => {
  const devUrl = "http://localhost:3000";
  const [loading, setLoading] = useState(false);
  const [news, setNews] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${devUrl}/${route}/1`)
      .then((res) => {
        setNews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <section className="pt-8">
      <span className="flex items-center gap-3">
        <Typography level="h1" noWrap={false} variant="plain">
          {title}
        </Typography>
        <button
          onClick={() => navigate(`/${route}`)}
          className="pr-6 btn-large"
        >
          <FaArrowAltCircleRight size={32} />
        </button>
      </span>
      {loading && <Spinner />}
      <div className="flex flex-wrap justify-around">
        <CardList newsList={news} />
      </div>
    </section>
  );
};

export default NewsSection;
