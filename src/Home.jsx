import React, { useEffect, useState } from 'react';
import "./Home.sass";
import ArticleButton from './ArticleButton';
import Article from './Article';

const Home = () => {
  const [articles, setArticles] = useState([]);
  const [currentArticleID, setCurrentArticleID] = useState(0);
  const [currentArticle, setCurrentArticle] = useState({});
  const [actualIDs, setActualIDs] = useState({});

  const handleArticleButtonClick = (newID) => {
    setCurrentArticleID(newID);
    setCurrentArticle(articles[newID]);
  };

  const likeButtonClicked = article => {
    article.likes++;
    fetch(`http:\/\/127.0.0.1:8000/api/articles/${article.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(article)
    })
    .then(response => response.text())
    .then(rawResponse => {
      console.log('Raw response:', rawResponse);
      return rawResponse;
    })
    .then(result => {
      // Handle the result if it's valid JSON
      try {
        const parsedResult = JSON.parse(result);

        const updatedArticles = [...articles];
        const articleToUpdate = updatedArticles.find(a => a.id === article.id);
        if (articleToUpdate) {
          setArticles(updatedArticles);
        }
      } catch (error) {
        console.error('Error parsing JSON:', error);
      }
    })
    .catch(error => {
      console.error(error);
    });
  }

  const dislikeButtonClicked = article => {
    article.dislikes++;
    fetch(`http:\/\/127.0.0.1:8000/api/articles/${article.id}/`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(article)
    })
    .then(response => response.json())
    .then(result => {

      const updatedArticles = [...articles];
      const articleToUpdate = updatedArticles.find(a => a.id === article.id);
       if (articleToUpdate) {
        setArticles(updatedArticles); 
      }

    })
    .catch(error => {
      console.error(error);
    });
  }

  const renderArticleButton = article => {
    const articleName = article.articleName;
    const likes = article.likes;
    const dislikes = article.dislikes;
    // article.id - 1 because I made a boo-boo and in the database id starts at 1
    return (
      <ArticleButton
        article={article}
        title={articleName}
        likesCounter={likes}
        dislikesCounter={dislikes}
        articleOnClick={() => handleArticleButtonClick(article.id)}
      />
    );
  };


  useEffect(() => {
    let isSubscribed = true;
    // declare the async data fetching function
    let newIDtoActualID = {};
    const fetchData = async () => {
      // get the data from the api

      const response = await fetch("http:\/\/127.0.0.1:8000/api/articles/", {method: "GET", mode: "cors"});
      // convert the data to json
      //console.log(data)
      const data = await response.json();

      console.log(data);

      // set state with the result if `isSubscribed` is true
      if (isSubscribed) {
        //console.log(typeof json)
        //console.log(json);
        setArticles(data);
        setCurrentArticle(data[currentArticleID]);
      }
    }

    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);

    // cancel any future `setData`
    return () => isSubscribed = false;
  }, [])


  //const articleButtons = articles.map(article => renderArticleButton(article));

  return (
    <div className="container">
      <div className="container__left-side">
        <h1 className="title">HistoLog</h1>
        <hr className="line-break"></hr>
        <div className="articlebuttons-scroll">
          <div className="articlebutton-container">{articles.map(article => renderArticleButton(article))}</div>
        </div>
      </div>
      <div className="right-side">
        <Article
          title={currentArticle.articleName}
          likesCounter={currentArticle.likes}
          dislikesCounter={currentArticle.dislikes}
          text={currentArticle.articleContent}
          author={currentArticle.author}
          likeButtonOnClick={() => likeButtonClicked(currentArticle)}
          dislikeButtonOnClick={() => dislikeButtonClicked(currentArticle)}
          id={currentArticleID}
        />
      </div>
    </div>
  );
};

export default Home;