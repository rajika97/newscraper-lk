import React, { useState, useEffect } from "react";
import axios from "axios";
import Typography from "@mui/joy/Typography";
import CardList from "./CardList";
import Spinner from "./Spinner";

const NewsSection = ({ title, route }) => {
  const PRODUCTION_URL = " https://newscraper-lk.vercel.app";
  const DEV_URL = "http://localhost:3000";
  const [loading, setLoading] = useState(false);
  const [hiruNews, setHiruNews] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${PRODUCTION_URL}/${route}/1`)
      .then((res) => {
        setHiruNews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  return (
    <section className="pt-8">
      <span className="mt-8">
        <Typography level="h1" noWrap={false} variant="plain">
          {title}
        </Typography>
      </span>
      {loading && <Spinner />}
      <div className="flex flex-wrap justify-around">
        <CardList newsList={hiruNews} />
      </div>
    </section>
  );
};

export default NewsSection;
