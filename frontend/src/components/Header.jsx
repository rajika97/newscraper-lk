import React from "react";

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-6 pr-8">
      <div>
        <h1 className="head_text">Newscraper</h1>
      </div>
      <div>
        <h3 className="desc">
          Stay informed with the latest Sri Lankan Sinhala News at your
          fingertips! This website scours multiple sources in real time, so you
          don't have to. Get all the updates without the hassle of jumping
          between different sites
        </h3>
      </div>
    </div>
  );
};

export default Header;
