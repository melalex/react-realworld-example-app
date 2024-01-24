import {
  createUserProfileRef,
  handleWithoutPropagation,
  toMounthAndDayStr,
} from "../utils/utilityFunctions";
import Pagination from "./Pagination";

const FAVORITED_CLASS = "btn btn-sm btn-primary pull-xs-right";
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary pull-xs-right";

function FavoriteButton({
  favoritesCount,
  favorited,
  addToFavorite,
  removeFromFavorite,
}) {
  const buttonClass = favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS;
  const action = favorited ? removeFromFavorite : addToFavorite;

  return (
    <button className={buttonClass} onClick={handleWithoutPropagation(action)}>
      <i className="ion-heart"></i> {favoritesCount}
    </button>
  );
}

function ArticleTag({ displayName }) {
  return <li className="tag-default tag-pill tag-outline">{displayName}</li>;
}

function ArticlePreview({ article, addToFavorite, removeFromFavorite }) {
  const authorProfileRef = createUserProfileRef(article.author.username);

  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href={authorProfileRef}>
          <img src={article.author.image} />
        </a>
        <div className="info">
          <a href={authorProfileRef} className="author">
            {article.author.username}
          </a>
          <time className="date" dateTime={article.createdAt}>
            {toMounthAndDayStr(article.createdAt)}
          </time>
        </div>
        <FavoriteButton
          favoritesCount={article.favoritesCount}
          favorited={article.favorited}
          addToFavorite={() => addToFavorite(article.slug)}
          removeFromFavorite={() => removeFromFavorite(article.slug)}
        />
      </div>
      <a href={`/article/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((it) => (
            <ArticleTag displayName={it} />
          ))}
        </ul>
      </a>
    </div>
  );
}

export default function ArticlesList({
  articles,
  pagging,
  setPage,
  addToFavorite,
  removeFromFavorite,
}) {
  return (
    <dev>
      {articles.map((it) => (
        <ArticlePreview
          article={it}
          addToFavorite={addToFavorite}
          removeFromFavorite={removeFromFavorite}
        />
      ))}

      <Pagination
        pagesCount={pagging.pageCount}
        currenPage={pagging.currentPage}
        setPage={setPage}
      />
    </dev>
  );
}
