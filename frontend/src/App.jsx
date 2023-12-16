import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import NewsPage from "./pages/NewsPage";
import GoogleAnalytics from "./components/GoogleAnalytics";

const App = () => {
  return (
    <Routes>
      <GoogleAnalytics />
      <Route path="/" element={<Home />} />
      <Route path="/:newsRoute" element={<NewsPage />} />
    </Routes>
  );
};

export default App;
