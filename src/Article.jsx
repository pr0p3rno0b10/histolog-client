import React from 'react';
import './Article.sass';

import { Link } from 'react-router-dom';

// this class will eventually need to render images

class Article extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			
		}
	}

	// needs function that converts json format into article
	convertRawArticleToArticle() {
		
	}

	render() {
		const likeButtonClicked = () => {
	    console.log("like button clicked");
	  }

	  const dislikeButtonClicked = () => {
	    console.log("dislike button clicked");
	  }
	  console.log(this.props);

		return (
			<>
				<h1 className="title">{this.props.title}</h1>
				<div className="article-text-scroll">
					<div className="article-text">{this.props.text}</div>
				</div>
				<div className="bottom-section">
					<div className="bottom-section-container">
						<div className="author-text">Article by: {this.props.author}</div>
						<div className="like-buttons-article">
			        <div className="like-button-article">
			          <span 
			            className="material-icons"
			            role='button' 
			            tabIndex='0'
			            onClick={this.props.likeButtonOnClick}
			          >
			            thumb_up
			          </span>
			          <div className="like-counter-article">
			            <div className="like-number-article">{this.props.likesCounter}</div>
			          </div>
			        </div>
			        <div className="like-button-article">
			          <span 
			            className="material-icons"
			            role='button' 
			            tabIndex='0'
			            onClick={this.props.dislikeButtonOnClick}
			          >
			            thumb_down
			          </span>
			          <div className="like-counter-article">
			            <div className="like-number-article">{this.props.dislikesCounter}</div>
			          </div>
			        </div>
			        <div>
				        <Link to={`/articles/${this.props.id}/fullscreen`}>
					        <div className="like-button-article">
					          <span 
					            className="material-icons"
					            role='button' 
					            tabIndex='0'
					            onClick={this.fullScreenOnClick}
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
}

export default Article;