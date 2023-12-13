import React from "react";
import Header from "../components/Header";

import NewsSection from "../components/NewsSection";

const Home = () => {
  return (
    <div className="body">
      <div className="main pl-8">
        <Header />
        <NewsSection title="Hiru News" route="hiru" />
        <NewsSection title="ITN News" route="itn" />
        <NewsSection title="Derana News" route="derana" />
        <NewsSection title="Asian Mirror News" route="asianmirror" />
        <NewsSection title="Lankadeepa News" route="lankadeepa" />
        <NewsSection title="Live At 8 News" route="liveat8" />
      </div>
    </div>
  );
};

export default Home;
