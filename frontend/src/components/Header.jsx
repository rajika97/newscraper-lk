import React from "react";
import Typography from "@mui/joy/Typography";
import "../assets/style.css";

const Header = () => {
  return (
    <div className="flex flex-col items-center justify-center pt-6">
      <div>
        <Typography
          level="h1"
          noWrap={false}
          variant="plain"
          color="primary"
          style={{ color: "black" }}
          className="head_text"
        >
          Newscraper
        </Typography>
      </div>
      <div>
        <Typography
          level="body-lg"
          noWrap={false}
          variant="plain"
          className="desc"
        >
          Get all the news you need, without having to visit multiple websites
        </Typography>
      </div>
    </div>
  );
};

export default Header;
