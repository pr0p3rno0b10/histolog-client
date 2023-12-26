import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import React, { useEffect, useState } from 'react';


import "./App.sass";

import Home from "./Home";
import IndividualArticle from "./IndividualArticle";
import Article from "./Article";
import Portal from "./Portal"

const App = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    let isSubscribed = true;
    const fetchData = async () => {
      const response = await fetch("http:\/\/127.0.0.1:8000/api/articles/", {method: "GET", mode: "cors"});
      const data = await response.json();
      if (isSubscribed) {
        setArticles(data);
      }
    }

    fetchData().catch(console.error);

    return () => isSubscribed = false;
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portal setArticles={setArticles} articles={articles}/>} />
        <Route path="/articles/:articleID" element={<Portal setArticles={setArticles} articles={articles}/>} />
        <Route path="/articles/:articleID/fullscreen" element={<IndividualArticle articles={articles}/>} />
      </Routes>
    </Router>
  );
};

export default App;