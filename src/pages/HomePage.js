import Footer from "../components/Footer";
import Header from "../components/Header";
import Pagination from "../components/Pagination";
import Tabs from "../components/Tabs";
import { GLOBAL_FEED, USER_FEED } from "../features/changeFeed/ChangeFeed";
import { handleWithoutPropagation } from "../utils/utilityFunctions";

const FAVORITED_CLASS = "btn btn-sm btn-primary pull-xs-right";
const NOT_FAVORITED_CLASS = "btn btn-sm btn-outline-primary pull-xs-right";

function Banner() {
  return (
    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
  );
}

function PopularTagsEntry({ tag }) {
  return (
    <a href={`/tags/${tag}`} class="tag-pill tag-default">
      {tag}
    </a>
  );
}

function PopularTags({ tags }) {
  return (
    <div class="sidebar">
      <p>Popular Tags</p>

      <div class="tag-list">
        {tags.map((it) => (
          <PopularTagsEntry tag={it} />
        ))}
      </div>
    </div>
  );
}

function FavoriteButton({
  favoritesCount,
  favorited,
  addToFavorite,
  removeFromFavorite,
}) {
  const buttonClass = favorited ? FAVORITED_CLASS : NOT_FAVORITED_CLASS;
  const action = favorited ? removeFromFavorite : addToFavorite;

  return (
    <button class={buttonClass} onClick={handleWithoutPropagation(action)}>
      <i class="ion-heart"></i> {favoritesCount}
    </button>
  );
}

function ArticleTag({ displayName }) {
  return <li class="tag-default tag-pill tag-outline">{displayName}</li>;
}

function ArticlePreview({ article, addToFavorite, removeFromFavorite }) {
  const authorProfileRef = `/profile/${article.author.username}`;

  return (
    <div class="article-preview">
      <div class="article-meta">
        <a href={authorProfileRef}>
          <img src={article.author.image} />
        </a>
        <div class="info">
          <a href={authorProfileRef} class="author">
            {article.author.username}
          </a>
          <time className="date" dateTime={article.createdAt}>
            {new Date(article.createdAt).toDateString()}
          </time>
        </div>
        <FavoriteButton
          favoritesCount={article.favoritesCount}
          favorited={article.favorited}
          addToFavorite={() => addToFavorite(article.slug)}
          removeFromFavorite={() => removeFromFavorite(article.slug)}
        />
      </div>
      <a href={`/article/${article.slug}`} class="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul class="tag-list">
          {article.tagList.map((it) => (
            <ArticleTag displayName={it} />
          ))}
        </ul>
      </a>
    </div>
  );
}

function HomePageContent({
  popularTags,
  pagging,
  selectedFeed,
  user,
  articles,
  setPage,
  setFeed,
  addToFavorite,
  removeFromFavorite,
}) {
  const globalFeedTab = { id: GLOBAL_FEED, displayName: "Global Feed" };
  const userFeedTab = { id: USER_FEED, displayName: "Your Feed" };
  const selectedTab = user.isAuthenticated ? selectedFeed : GLOBAL_FEED;
  const tabs = user.isAuthenticated
    ? [userFeedTab, globalFeedTab]
    : [globalFeedTab];

  return (
    <div class="home-page">
      <Banner />

      <div class="container page">
        <div class="row">
          <div class="col-md-9">
            <Tabs
              values={tabs}
              selectedValue={selectedTab}
              setValue={setFeed}
            />

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
          </div>

          <div class="col-md-3">
            <PopularTags tags={popularTags} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function HomePage() {
  const user = {
    isAuthenticated: true,
    username: "Eric Simons",
  };
  const popularTags = [
    "programming",
    "javascript",
    "emberjs",
    "angularjs",
    "react",
    "mean",
    "node",
    "rails",
  ];
  const pagging = {
    pageCount: 2,
    currentPage: 1,
  };
  const articles = [
    {
      slug: "how-to-build-webapps-that-scale",
      title: "How to build webapps that scale",
      description: "This is the description for the post.",
      body: "string",
      tagList: ["realworld", "implementations"],
      createdAt: "2024-01-23T19:14:01.589Z",
      updatedAt: "2024-01-23T19:14:01.589Z",
      favorited: false,
      favoritesCount: 29,
      author: {
        username: "Eric Simons",
        bio: "string",
        image: "http://i.imgur.com/Qr71crq.jpg",
        following: false,
      },
    },
    {
      slug: "the-song-you",
      title:
        "The song you won't ever stop singing. No matter how hard you try.",
      description: "This is the description for the post.",
      body: "string",
      tagList: ["realworld", "implementations"],
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
    },
  ];
  const selectedFeed = GLOBAL_FEED;
  const setPage = function (i) {
    alert(`Go to page ${i}`);
  };
  const setFeed = function (i) {
    alert(`Set feed to ${i}`);
  };
  const addToFavorite = function (i) {
    alert(`Add article ${i} to favorite`);
  };
  const removeFromFavorite = function (i) {
    alert(`Remove article from ${i} favorite`);
  };

  return (
    <div>
      <Header user={user} />
      <HomePageContent
        popularTags={popularTags}
        pagging={pagging}
        selectedFeed={selectedFeed}
        user={user}
        articles={articles}
        setPage={setPage}
        setFeed={setFeed}
        addToFavorite={addToFavorite}
        removeFromFavorite={removeFromFavorite}
      />
      <Footer />
    </div>
  );
}
