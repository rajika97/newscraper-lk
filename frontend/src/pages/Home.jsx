import React, { useState, useEffect } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [hiruNews, setHiruNews] = useState([]);
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
  }, []);
  return (
    <>
      <h1>Hiru News</h1>
      {loading && <Spinner />}
      <div>
        {hiruNews.map((news) => {
          return (
            <div key={news._id}>
              <Link to={`/news/${news._id}`}>
                <h2>{news.title}</h2>
              </Link>
              <p>{news.createdDate}</p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Home;
