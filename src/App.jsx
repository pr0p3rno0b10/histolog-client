import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import "./App.sass";

import Home from "./Home";
import IndividualArticle from "./IndividualArticle";
import Article from "./Article";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/articles/:articleID" element={<Article />} />
        <Route path="/articles/:articleID/fullscreen" element={<IndividualArticle/>} />
      </Routes>
    </Router>
  );
};

export default App;