import React from 'react';
import './ArticleButton.sass';

import { Link } from 'react-router-dom';

const ArticleButton = ({ article }) => {
  const { id, articleName, likes, dislikes } = article;

  return (
    <Link to={`/articles/${id}`} >
      <div className="article-button">
        <div className="article-title-container">
      	  <div className="article-title">{articleName}</div>
        </div>
      </div>
      <div className="like-buttons">
        <div className="like-button">
          <span className="material-icons">
            thumb_up
          </span>
          <div className="like-counter">
            <div className="like-number">{likes}</div>
          </div>
        </div>
        <div className="like-button">
          <span className="material-icons">
            thumb_down
          </span>
          <div className="like-counter">
            <div className="like-number">{dislikes}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ArticleButton;
