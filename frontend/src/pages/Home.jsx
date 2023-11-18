import React from "react";

import NewsSection from "../components/NewsSection";

const Home = () => {
  return (
    <div className="body">
      <div className="main pl-8">
        <NewsSection title="Derana News" route="derana" />
        <NewsSection title="Live At 8 News" route="liveat8" />
        <NewsSection title="ITN News" route="itn" />
        <NewsSection title="Asian Mirror News" route="asianmirror" />
        <NewsSection title="Hiru News" route="hiru" />
      </div>
    </div>
  );
};

export default Home;
