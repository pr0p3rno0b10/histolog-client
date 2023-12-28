import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import "./IndividualArticle.sass";


const IndividualArticle = () => {
  const { articleID } = useParams();
  const [currentArticle, setCurrentArticle] = useState([]);

  useEffect(() => {
    const getArticle = async () => {
      console.log(articleID);
      const response = await fetch(process.env.REACT_APP_API_URI + `/articles/${articleID}/`, {method: "GET", mode: "cors"});
      const data = await response.json();

      setCurrentArticle(data);

    }

    getArticle();
  }, [])

  return (
    <div>
      <h1 className="title">{currentArticle.articleName}</h1>
      <div className="individual-article-text" dangerouslySetInnerHTML={{ __html: currentArticle.articleContent }} />
      <div className="bottom-section-individual-article">
        <div className="bottom-section-container-individual-article">
          <div className="author-text-individual-article">Article by: {currentArticle.author}</div>
          <div className="like-buttons-individual-article">
              <div className="like-button-individual-article">
                <span 
                  className="material-icons"
                  role='button' 
                  tabIndex='0'
                  
                >
                  thumb_up
                </span>
                <div className="like-counter-individual-article">
                  <div className="like-number-individual-article">{currentArticle.likes}</div>
                </div>
              </div>
              <div className="like-button-individual-article">
                <span 
                  className="material-icons"
                  role='button' 
                  tabIndex='0'
                  
                >
                  thumb_down
                </span>
                <div className="like-counter-individual-article">
                  <div className="like-number-individual-article">{currentArticle.dislikes}</div>
                </div>
              </div>
              <div>
                <Link to={`/articles/${articleID}`}>
                  <div className="like-button-individual-article">
                    <span 
                      className="material-icons"
                      role='button' 
                      tabIndex='0'
                      
                    >
                      first_page
                    </span>
                    
                  </div>
                </Link>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default IndividualArticle;