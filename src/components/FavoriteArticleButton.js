import { useDispatch, useSelector } from "react-redux";
import { selectIsAuthenticated } from "../features/user/userSlice";
import { FavoriteStatus, selectArticleById, switchFavoriteStatus } from "../features/article/articleSlice";
import { handleWithoutPropagation } from "../utils/utilityFunctions";
import { Link } from "react-router-dom";

export default function FavoriteArticleButton({
  articleId,
  favoriteClass,
  notFacoriteClass,
}) {
  const article = useSelector((state) => selectArticleById(state, articleId));
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const buttonClass = article.favorited ? favoriteClass : notFacoriteClass;
  const dispatch = useDispatch();
  const favoriteClicked = () => dispatch(switchFavoriteStatus(articleId));

  if (isAuthenticated) {
    return (
      <button
        className={buttonClass}
        onClick={handleWithoutPropagation(favoriteClicked)}
        disabled={article.favoritedStatus === FavoriteStatus.UPDATING}
      >
        <i className="ion-heart"></i> {article.favoritesCount}
      </button>
    );
  } else {
    return (
      <Link
        className={buttonClass}
        to="/login"
        disabled={article.favoritedStatus === FavoriteStatus.UPDATING}
      >
        <i className="ion-heart"></i> {article.favoritesCount}
      </Link>
    );
  }
}
