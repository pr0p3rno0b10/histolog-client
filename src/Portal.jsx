import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Article from "./Article"

import ArticleButton from './ArticleButton';
import './Portal.sass';

const Portal = ({ setArticles, articles }) => {
  const { articleID } = useParams();
  const [currentArticle, setCurrentArticle] = useState(1)
  const [likedArticleIDs, setLikedArticleIDs] = useState(new Set())
  const [dislikedArticleIDs, setDislikedArticleIDs] = useState(new Set())

  useEffect(() => {
    const index = articles.findIndex(article => article.id === articleID)
    if (index >= 0) setCurrentArticle(articles[index])
  }, [articleID, articles])

  useEffect(() => {
    const items = { ...localStorage }
    for (const key in items) {
      if (key.endsWith("-liked") && items[key]) {
        setLikedArticleIDs(ids => new Set([...ids, key.substring(0, key.length - 6)]))
      } else if (key.endsWith("-disliked") && items[key]) {
        setDislikedArticleIDs(ids => new Set([...ids, key.substring(0, key.length - 9)]))
      }
    }
  }, [])

  const likeButtonClicked = () => {
    if (likedArticleIDs.has(currentArticle.id)) return console.log("Already liked")
    const dislikes = dislikedArticleIDs.has(currentArticle.id) ? currentArticle.dislikes - 1 : currentArticle.dislikes; 
    const articleCopy = {...currentArticle, likes: currentArticle.likes + 1, dislikes}
    fetch(process.env.REACT_APP_API_URI + `/articles/${currentArticle.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(articleCopy)
    })
    .then(response => response.text())
    .then(rawResponse => {
      console.log('Raw response:', rawResponse);
      return rawResponse;
    })
    .then(result => {
      try {
        const parsedResult = JSON.parse(result);
        setArticles(articles => {
          const index = articles.findIndex(a => a.id === currentArticle.id);
          return [...articles.slice(0, index), articleCopy, ...articles.slice(index + 1)]
        })
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
      localStorage.setItem(articleID + "-disliked", false)
      localStorage.setItem(articleID + "-liked", true)
      setLikedArticleIDs(ids => new Set([...ids, articleID]))
      const disliked = new Set(...dislikedArticleIDs)
      disliked.delete(articleID)
      setDislikedArticleIDs(disliked)

    })
    .catch(error => {
      console.error(error);
    });
  }

  const dislikeButtonClicked = () => {
    if (dislikedArticleIDs.has(currentArticle.id)) return console.log("Already disliked")
    const likes = likedArticleIDs.has(currentArticle.id) ? currentArticle.likes - 1 : currentArticle.likes; 
    const articleCopy = {...currentArticle, dislikes: currentArticle.dislikes + 1, likes}
    fetch(process.env.REACT_APP_API_URI +`/articles/${currentArticle.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(articleCopy)
    })
    .then(response => response.text())
    .then(rawResponse => {
      console.log('Raw response:', rawResponse);
      return rawResponse;
    })
    .then(result => {
      try {
        const parsedResult = JSON.parse(result);
        setArticles(articles => {
          const index = articles.findIndex(a => a.id === currentArticle.id);
          return [...articles.slice(0, index), articleCopy, ...articles.slice(index + 1)]
        })
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
      localStorage.setItem(articleID + "-disliked", true)
      localStorage.setItem(articleID + "-liked", false)
      setLikedArticleIDs(ids => new Set([...ids, articleID]))
      const liked = new Set(...likedArticleIDs)
      liked.delete(articleID)
      setDislikedArticleIDs(liked)
    })
    .catch(error => {
      console.error(error);
    });
  }

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
        { currentArticle && <Article setArticles={setArticles} article={currentArticle} likeButtonClicked={likeButtonClicked} dislikeButtonClicked={dislikeButtonClicked}/> }
      </div>
    </div>
	);
}

export default Portal;