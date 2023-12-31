import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

import NewsSection from "../components/NewsSection";

const Home = () => {
  return (
    <div className="body">
      <div className="pl-8">
        <Header />
        <NewsSection title="Hiru News" route="hiru" />
        <NewsSection title="Sirasa News" route="sirasa" />
        <NewsSection title="ITN News" route="itn" />
        <NewsSection title="Derana News" route="derana" />
        <NewsSection title="Colombo Times News" route="colombotimes" />
        <NewsSection title="Ada News" route="ada" />
        <NewsSection title="BBC News" route="bbc" />
        <NewsSection title="Asian Mirror News" route="asianmirror" />
        <NewsSection title="Lankadeepa News" route="lankadeepa" />
        {/* <NewsSection title="Divaina News" route="divaina" /> */}
        <NewsSection title="Neth News" route="neth" />
        <NewsSection title="Lanka Truth News" route="lankatruth" />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
