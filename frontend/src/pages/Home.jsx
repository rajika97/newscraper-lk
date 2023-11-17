import React from "react";

import NewsSection from "../components/NewsSection";

const Home = () => {
  return (
    <div className="body">
      <div className="main pl-8">
        <NewsSection title="Hiru News" route="hiru" />
        <NewsSection title="Sirasa News" route="sirasa" />
        <NewsSection title="ITN News" route="itn" />
        <NewsSection title="Asian Mirror News" route="asianmirror" />
        <NewsSection title="Derana News" route="derana" />
      </div>
    </div>
  );
};

export default Home;
