const Portal = ({ articles, currentArticle, currentArticleID, actualIDs, }) => {
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
          id={currentArticleID+1}
          actualID={actualIDs[currentArticleID + 1]}
        />
      </div>
    </div>
	);

}