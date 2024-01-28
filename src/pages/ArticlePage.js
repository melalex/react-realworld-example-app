import { useDispatch, useSelector } from "react-redux";
import CommentsLayout from "../components/CommentsLayout";
import FollowButton from "../components/FollowButton";
import {
  createUserProfileRef,
  handleWithoutPropagation,
  toMounthAndDayStr,
} from "../utils/utilityFunctions";
import { selectUser } from "../features/user/userSlice";
import {
  loadOneArticle,
  selectArticleById,
} from "../features/article/articleSlice";
import { selectProfile, setProfile } from "../features/profile/profileSlice";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { selectComments, setArticle } from "../features/comment/commentSlice";
import FavoriteArticleButton from "../components/FavoriteArticleButton";
import { deleteArticle } from "../features/article/articleApi";

const FAVORITED_CLASS = "btn btn-sm btn-primary";
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary";

function ArticleControls({ article, author }) {
  const currentUser = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (
    currentUser.isAuthenticated &&
    author.data.username === currentUser.profile.username
  ) {
    return (
      <>
        <button
          className="btn btn-sm btn-outline-secondary"
          onClick={handleWithoutPropagation(() =>
            navigate(`/editor/${article.slug}`)
          )}
        >
          <i className="ion-edit"></i> Edit Article
        </button>{" "}
        <button
          className="btn btn-sm btn-outline-danger"
          onClick={handleWithoutPropagation(() =>
            dispatch(deleteArticle(article.slug))
          )}
        >
          <i className="ion-trash-a"></i> Delete Article
        </button>
      </>
    );
  } else {
    return (
      <>
        <FollowButton
          isAuthenticated={currentUser.isAuthenticated}
          followingStatus={author.data.followingStatus}
          username={author.data.username}
          isFollowng={author.data.following}
        />
        &nbsp;&nbsp;
        <FavoriteArticleButton
          articleId={article.slug}
          favoriteClass={FAVORITED_CLASS}
          notFacoriteClass={NOT_FAVORITED_CLASS}
        />
      </>
    );
  }
}

function ArticleBanner({ article, author }) {
  const authorProfileRef = createUserProfileRef(article.author.username);

  return (
    <div className="banner">
      <div className="container">
        <h1>{article.title}</h1>

        <div className="article-meta">
          <Link to={authorProfileRef}>
            <img src={article.author.image} />
          </Link>
          <div className="info">
            <Link to={authorProfileRef} className="author">
              {article.author.username}
            </Link>
            <span className="date">{toMounthAndDayStr(article.updatedAt)}</span>
          </div>
          <ArticleControls article={article} author={author} />
        </div>
      </div>
    </div>
  );
}

export default function ArticlePage() {
  const { slug } = useParams();
  const article = useSelector((state) => selectArticleById(state, slug));
  const author = useSelector(selectProfile);
  const comments = useSelector(selectComments);
  const authorProfileRef = createUserProfileRef(author.data.username);
  const dispatch = useDispatch();

  useEffect(() => {
    if (article == null) {
      dispatch(loadOneArticle(slug));
    } else if (author.data.username !== article.author.username) {
      dispatch(setProfile(article.author));
    } else if (comments.article !== article.slug) {
      dispatch(setArticle(article.slug));
    }
  }, [article, author, comments, slug]);

  if (article == null) return <></>;
  else {
    return (
      <div className="article-page">
        <ArticleBanner article={article} author={author} />

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <p>{article.description}</p>
              <p>{article.body}</p>
              <ul className="tag-list">
                {article.tagList.map((it) => (
                  <li key={it} className="tag-default tag-pill tag-outline">
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr />

          <div className="article-actions">
            <div className="article-meta">
              <Link to={authorProfileRef}>
                <img src={article.author.image} />
              </Link>
              <div className="info">
                <Link to={authorProfileRef} className="author">
                  {article.author.username}
                </Link>
                <span className="date">{article.createdAtDateStr}</span>
              </div>
              <ArticleControls article={article} author={author} />
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <CommentsLayout />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
