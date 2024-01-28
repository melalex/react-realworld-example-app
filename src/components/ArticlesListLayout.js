import { useDispatch, useSelector } from "react-redux";
import {
  createUserProfileRef,
  toMounthAndDayStr,
} from "../utils/utilityFunctions";
import Pagination from "./Pagination";
import {
  loadArticles,
  selectArticleById,
  selectArticleIds,
  selectArticleListStatus,
  selectArticlePage,
  selectArticlePageCount,
  setPage,
} from "../features/article/articleSlice";
import { Link } from "react-router-dom";
import Status from "../utils/Status";
import FavoriteArticleButton from "./FavoriteArticleButton";
import { useEffect } from "react";

const FAVORITED_CLASS = "btn btn-sm btn-primary pull-xs-right";
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary pull-xs-right";

function ArticleTag({ displayName }) {
  return <li className="tag-default tag-pill tag-outline">{displayName}</li>;
}

function ArticlePreview({ articleId }) {
  const article = useSelector((state) => selectArticleById(state, articleId));
  const authorProfileRef = createUserProfileRef(article.author.username);

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={authorProfileRef}>
          <img src={article.author.image} />
        </Link>
        <div className="info">
          <Link to={authorProfileRef} className="author">
            {article.author.username}
          </Link>
          <time className="date" dateTime={article.updatedAt}>
            {toMounthAndDayStr(article.updatedAt)}
          </time>
        </div>
        <FavoriteArticleButton
          articleId={articleId}
          favoriteClass={FAVORITED_CLASS}
          notFacoriteClass={NOT_FAVORITED_CLASS}
        />
      </div>
      <Link to={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((it) => (
            <ArticleTag key={it} displayName={it} />
          ))}
        </ul>
      </Link>
    </div>
  );
}

function ArticlesList() {
  const articleIds = useSelector(selectArticleIds);
  const status = useSelector(selectArticleListStatus);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === Status.IDLE) {
      dispatch(loadArticles());
    }
  }, [status]);

  if (status === Status.LOADING) {
    return <div className="article-preview">Loading...</div>;
  }
  if (articleIds.length === 0) {
    return <div className="article-preview">No articles are here... yet.</div>;
  } else
    return (
      <>
        {articleIds.map((it) => (
          <ArticlePreview key={it} articleId={it} />
        ))}
      </>
    );
}

export default function ArticlesListLayout() {
  const page = useSelector(selectArticlePage);
  const pageCount = useSelector(selectArticlePageCount);
  const dispatch = useDispatch();

  return (
    <div>
      <ArticlesList />
      <Pagination
        pagesCount={pageCount}
        currenPage={page}
        setPage={(page) => dispatch(setPage(page))}
      />
    </div>
  );
}
