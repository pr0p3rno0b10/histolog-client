import React from 'react';
import './Article.sass';

import { Link } from 'react-router-dom';


const Article = ({setArticles, article, likeButtonClicked, dislikeButtonClicked}) => {
	const { id, articleName, likes, dislikes, articleContent, author } = article;


	return (
		<>
			<h1 className="title">{articleName}</h1>
			<div className="article-text-scroll">
				<div className="article-text">{articleContent}</div>
			</div>
			<div className="bottom-section">
				<div className="bottom-section-container">
					<div className="author-text">Article by: {author}</div>
					<div className="like-buttons-article">
		        <div className="like-button-article">
		          <span 
		            className="material-icons"
		            role='button' 
		            tabIndex='0'
		            onClick={likeButtonClicked}
		          >
		            thumb_up
		          </span>
		          <div className="like-counter-article">
		            <div className="like-number-article">{likes}</div>
		          </div>
		        </div>
		        <div className="like-button-article">
		          <span 
		            className="material-icons"
		            role='button' 
		            tabIndex='0'
		            onClick={dislikeButtonClicked}
		          >
		            thumb_down
		          </span>
		          <div className="like-counter-article">
		            <div className="like-number-article">{dislikes}</div>
		          </div>
		        </div>
		        <div>
			        <Link to={`/articles/${id}/fullscreen`}>
				        <div className="like-button-article">
				          <span 
				            className="material-icons"
				          >
				            fullscreen
				          </span>
				          
				        </div>
				      </Link>
				    </div>
		      </div>
				</div>
			</div>
		</>
	);
}

export default Article;