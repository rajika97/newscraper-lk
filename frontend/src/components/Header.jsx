import React from "react";

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-6">
      <div>
        <h1 className="head_text">Newscraper</h1>
      </div>
      <div>
        <h3 className="desc">
          Get all the news you need, REAL TIME, without having to visit multiple
          websites
        </h3>
      </div>
    </div>
  );
};

export default Header;
