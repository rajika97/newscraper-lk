import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import NewsCard from "../components/NewsCard";
import CardList from "../components/CardList";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [hiruNews, setHiruNews] = useState([]);
  const [deranaNews, setDeranaNews] = useState([]);
  const [itnNews, setItnNews] = useState([]);
  const [sirasaNews, setSirasaNews] = useState([]);
  const [asianMirrorNews, setAsianMirrorNews] = useState([]);
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
    axios
      .get("http://localhost:3000/itn/1")
      .then((res) => {
        console.log(res.data);
        setItnNews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:3000/sirasa/1")
      .then((res) => {
        console.log(res.data);
        setSirasaNews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
    axios
      .get("http://localhost:3000/asianmirror/1")
      .then((res) => {
        console.log(res.data);
        setAsianMirrorNews(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="body">
      <div className="main">
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
        <h1 className="mx-8 text-xl">Sirasa News</h1>
        {loading && <Spinner />}
        <div className="flex flex-wrap justify-around">
          <CardList newsList={sirasaNews} />
        </div>
        <h1 className="mx-8 text-xl">ITN News</h1>
        {loading && <Spinner />}
        <div className="flex flex-wrap justify-around">
          <CardList newsList={itnNews} />
        </div>
        <h1 className="mx-8 text-xl">Asian Mirror News</h1>
        {loading && <Spinner />}
        <div className="flex flex-wrap justify-around">
          <CardList newsList={asianMirrorNews} />
        </div>
      </div>
    </div>
  );
};

export default Home;
