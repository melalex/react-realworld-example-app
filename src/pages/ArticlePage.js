import CommentsLayout from "../components/CommentsLayout";
import FollowButton from "../components/FollowButton";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { handleWithoutPropagation } from "../utils/utilityFunctions";

const FAVORITED_CLASS = "btn btn-sm btn-primary";
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary";

function ArticleFavoriteButton({
  favoritesCount,
  favorited,
  removeFromFavorite,
  addToFavorite,
}) {
  const buttonClass = favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS;
  const action = favorited ? removeFromFavorite : addToFavorite;

  return (
    <button className={buttonClass} onClick={handleWithoutPropagation(action)}>
      <i className="ion-heart"></i>
      &nbsp; Favorite Post{" "}
      <span className="counter">({favoritesCount})</span>
    </button>
  );
}

function ArticleControls({
  article,
  currentUser,
  onFollow,
  onUnfollow,
  removeFromFavorite,
  addToFavorite,
}) {
  if (article.author.username === currentUser.username) {
    return (
      <div>
        <button className="btn btn-sm btn-outline-secondary">
          <i className="ion-edit"></i> Edit Article
        </button>
        <button className="btn btn-sm btn-outline-danger">
          <i className="ion-trash-a"></i> Delete Article
        </button>
      </div>
    );
  } else {
    return (
      <>
        <FollowButton
          username={article.author.username}
          isFollowng={article.author.following}
          onFollow={onFollow}
          onUnfollow={onUnfollow}
        />
        &nbsp;&nbsp;
        <ArticleFavoriteButton
          favoritesCount={article.favoritesCount}
          favorited={article.favorited}
          removeFromFavorite={removeFromFavorite}
          addToFavorite={addToFavorite}
        />
      </>
    );
  }
}

function ArticleBanner({
  article,
  currentUser,
  onFollow,
  onUnfollow,
  removeFromFavorite,
  addToFavorite,
}) {
  return (
    <div className="banner">
      <div className="container">
        <h1>{article.title}</h1>

        <div className="article-meta">
          <a href={article.author.profileRef}>
            <img src={article.author.image} />
          </a>
          <div className="info">
            <a href={article.author.profileRef} className="author">
              {article.author.username}
            </a>
            <span className="date">{article.createdAtDateStr}</span>
          </div>
          <ArticleControls
            article={article}
            currentUser={currentUser}
            onFollow={onFollow}
            onUnfollow={onUnfollow}
            removeFromFavorite={removeFromFavorite}
            addToFavorite={addToFavorite}
          />
        </div>
      </div>
    </div>
  );
}

function ArticlePageContent({ article, currentUser }) {
  const stubAction = () => alert("!!!");

  return (
    <div className="article-page">
      <ArticleBanner
        article={article}
        currentUser={currentUser}
        onFollow={stubAction}
        onUnfollow={stubAction}
        removeFromFavorite={stubAction}
        addToFavorite={stubAction}
      />

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            <p>{article.description}</p>
            <p>{article.body}</p>
            <ul className="tag-list">
              {article.tagList.map((it) => (
                <li className="tag-default tag-pill tag-outline">{it}</li>
              ))}
            </ul>
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <div className="article-meta">
            <a href={article.author.profileRef}>
              <img src={article.author.image} />
            </a>
            <div className="info">
              <a href={article.author.profileRef} className="author">
                {article.author.username}
              </a>
              <span className="date">{article.createdAtDateStr}</span>
            </div>
            <ArticleControls
              article={article}
              currentUser={currentUser}
              onFollow={stubAction}
              onUnfollow={stubAction}
              removeFromFavorite={stubAction}
              addToFavorite={stubAction}
            />
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

export default function ArticlePage() {
  const user = {
    isAuthenticated: true,
    username: "Eric Simons",
    profileRef: "/profile/Eric%20FSimons",
    image: "http://i.imgur.com/Qr71crq.jpg",
    bio: "Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games",
  };

  const article = {
    slug: "the-song-you",
    title: "The song you won't ever stop singing. No matter how hard you try.",
    description: "This is the description for the post.",
    body: "string",
    tagList: ["realworld", "implementations"],
    createdAtDateStr: "January 23",
    createdAt: "2024-01-23T19:14:01.589Z",
    updatedAt: "2024-01-23T19:14:01.589Z",
    favorited: true,
    favoritesCount: 11,
    author: {
      username: "Albert Pai",
      bio: "string",
      image: "http://i.imgur.com/N4VcUeJ.jpg",
      following: true,
    },
  };

  return (
    <div>
      <Header user={user} />
      <ArticlePageContent article={article} currentUser={user} />
      <Footer />
    </div>
  );
}
