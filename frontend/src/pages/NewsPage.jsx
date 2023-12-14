import React from "react";
import { useParams } from "react-router-dom";
import Section from "../components/newsPage/Section";
import Header from "../components/Header";
import Footer from "../components/Footer";

const NewsPage = () => {
  const { newsRoute } = useParams();
  return (
    <div className="body">
      <div className="pl-8">
        <Header />
        {(() => {
          if (newsRoute === "derana") {
            return <Section title="Derana News" route="derana" />;
          } else if (newsRoute === "liveat8") {
            return <Section title="Live At 8 News" route="liveat8" />;
          } else if (newsRoute === "itn") {
            return <Section title="ITN News" route="itn" />;
          } else if (newsRoute === "asianmirror") {
            return <Section title="Asian Mirror News" route="asianmirror" />;
          } else if (newsRoute === "hiru") {
            return <Section title="Hiru News" route="hiru" />;
          } else if (newsRoute === "lankadeepa") {
            return <Section title="Lankadeepa News" route="lankadeepa" />;
          } else {
            return <h1>404 Not Found</h1>;
          }
        })()}
        <Footer />
      </div>
    </div>
  );
};

export default NewsPage;
