import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="about" element={<About />} />
      <Route path="dashboard" element={<Dashboard />} /> */}
    </Routes>
  );
};

export default App;
