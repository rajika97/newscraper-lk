import React from "react";
import NewsCard from "./NewsCard";

const CardList = ({ newsList }) => {
  return (
    <div className="flex overflow-x-auto mt-6">
      {newsList.map((news) => (
        <NewsCard
          key={news._id}
          title={news.title}
          image={news.image}
          date={news.createdDate}
          link={news.link}
        />
      ))}
    </div>
  );
};

export default CardList;
