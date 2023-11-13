import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import NewsCard from "../components/NewsCard";
import CardList from "../components/CardList";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [hiruNews, setHiruNews] = useState([]);
  const [deranaNews, setDeranaNews] = useState([]);
  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3000/hiru/1")
      .then((res) => {
        console.log(res.data);
        setHiruNews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:3000/derana/1")
      .then((res) => {
        console.log(res.data);
        setDeranaNews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <h1 className="mx-8 text-xl">Hiru News</h1>
      {loading && <Spinner />}
      <div className="flex flex-wrap justify-around">
        <CardList newsList={hiruNews} />
      </div>
      <h1 className="mx-8 text-xl">Derana News</h1>
      {loading && <Spinner />}
      <div className="flex flex-wrap justify-around">
        <CardList newsList={deranaNews} />
      </div>
    </>
  );
};

export default Home;
