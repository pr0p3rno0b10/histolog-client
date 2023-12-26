import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Article from "./Article"

import ArticleButton from './ArticleButton';

const Portal = ({ setArticles, articles }) => {
  const { articleID } = useParams();
  const [currentArticle, setCurrentArticle] = useState(null)
  useEffect(() => {
    const index = articles.findIndex(article => article.id === +articleID)
    if (index >= 0) setCurrentArticle(articles[index])
  }, [articleID, articles])

	return (
		<div className="container">
      <div className="container__left-side">
        <h1 className="title">HistoLog</h1>
        <hr className="line-break"></hr>
        <div className="articlebuttons-scroll">
          <div className="articlebutton-container">
            {articles.map(article => <ArticleButton article={article} key={article.id}/>)}
          </div>
        </div>
      </div>
      <div className="right-side">
        { currentArticle && <Article setArticles={setArticles} article={currentArticle} /> }
      </div>
    </div>
	);
}

export default Portal;