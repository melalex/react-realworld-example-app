import ArticlesList from "../components/ArticlesList";
import Tabs from "../components/Tabs";
import { GLOBAL_FEED, USER_FEED } from "../features/changeFeed/ChangeFeed";

function Banner() {
  return (
    <div className="banner">
      <div className="container">
        <h1 className="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>
  );
}

function PopularTagsEntry({ tag }) {
  return (
    <a href={`/tags/${tag}`} className="tag-pill tag-default">
      {tag}
    </a>
  );
}

function PopularTags({ tags }) {
  return (
    <div className="sidebar">
      <p>Popular Tags</p>

      <div className="tag-list">
        {tags.map((it) => (
          <PopularTagsEntry key={it} tag={it} />
        ))}
      </div>
    </div>
  );
}

export default function HomePage() {
  const user = {
    isAuthenticated: true,
    username: "Eric Simons",
    image: "http://i.imgur.com/Qr71crq.jpg",
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

  const globalFeedTab = { id: GLOBAL_FEED, displayName: "Global Feed" };
  const userFeedTab = { id: USER_FEED, displayName: "Your Feed" };
  const selectedTab = user.isAuthenticated ? selectedFeed : GLOBAL_FEED;
  const tabs = user.isAuthenticated
    ? [userFeedTab, globalFeedTab]
    : [globalFeedTab];

  return (
    <div className="home-page">
      <Banner />

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <Tabs
              values={tabs}
              selectedValue={selectedTab}
              setValue={setFeed}
            />

            <ArticlesList
              articles={articles}
              pagging={pagging}
              addToFavorite={addToFavorite}
              removeFromFavorite={removeFromFavorite}
              setPage={setPage}
            />
          </div>

          <div className="col-md-3">
            <PopularTags tags={popularTags} />
          </div>
        </div>
      </div>
    </div>
  );
}
