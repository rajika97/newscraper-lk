import React from "react";

const Footer = () => {
  return (
    <footer className="footer">
      <p className="disclaimer">
        Disclaimer: We do not own the content displayed on this website. All
        news content and rights belong to their respective websites. This
        website is non-profit, and we do not generate any revenue from it.
      </p>
      <p>
        Created with{" "}
        <span role="img" aria-label="heart">
          ❤️
        </span>{" "}
        by Rajika Chathuranga |{" "}
        <a
          href="https://www.linkedin.com/in/rajika-chathuranga/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-500"
        >
          LinkedIn
        </a>
      </p>
      <p>
        Find this project on{" "}
        <a
          href="https://github.com/rajika97/newscraper-lk"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-500"
        >
          GitHub
        </a>
      </p>
    </footer>
  );
};

export default Footer;
