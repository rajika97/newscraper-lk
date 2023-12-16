import React, { useState, useEffect } from "react";

const DigitalClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const hours = currentTime.getHours() % 12 || 12; // Convert to 12-hour format
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  const amPm = currentTime.getHours() >= 12 ? "PM" : "AM";

  const formattedTime = `${hours}:${minutes < 10 ? "0" : ""}${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}  ${amPm}`;

  return (
    <div className="rounded-3xl bg-white py-3 px-8 text-center">
      <p className="text-lg">Real-Time Sri Lankan News</p>
      <p className="text-2xl font-bold">{formattedTime}</p>
    </div>
  );
};

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
      <div className="mt-4">
        <DigitalClock />
      </div>
    </div>
  );
};

export default Header;
