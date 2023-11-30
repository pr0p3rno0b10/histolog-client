import React from 'react';
import './ArticleButton.sass';

const ArticleButton = (props) => {


  const dislikeButtonClicked = () => {
    console.log("dislike button clicked");
  }

  return (
    <div>
      <div 
        className="article-button"
        role='button' 
        tabIndex='0'
        onClick={props.articleOnClick}
      >
        <div className="article-title-container">
      	  <div className="article-title">{props.title}</div>
        </div>
      </div>
      <div className="like-buttons">
        <div className="like-button">
          <span className="material-icons">
            thumb_up
          </span>
          <div className="like-counter">
            <div className="like-number">{props.likesCounter}</div>
          </div>
        </div>
        <div className="like-button">
          <span className="material-icons">
            thumb_down
          </span>
          <div className="like-counter">
            <div className="like-number">{props.dislikesCounter}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleButton;
