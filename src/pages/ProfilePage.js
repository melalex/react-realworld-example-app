import ArticlesList from "../components/ArticlesList";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Tabs from "../components/Tabs";
import {
  FAVORITE_ARTICLES,
  MY_ARTICLES,
} from "../features/selectArticlesType/SelectArticlesType";

function ProfileAction({ currentUser, profile }) {
  if (currentUser.username === profile.username)
    return (
      <button className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a"></i>
        &nbsp; Edit Profile Settings
      </button>
    );
  else
    return (
      <button className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-plus-round"></i>
        &nbsp; Follow {profile.username}
      </button>
    );
}

function ProfileInfo({ currentUser, profile }) {
  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img src={profile.image} className="user-img" />
            <h4>{profile.username}</h4>
            <p>{profile.bio}</p>
            <ProfileAction currentUser={currentUser} profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ProfilePageContent({
  currentUser,
  profile,
  articles,
  pagging,
  selectedTab,
  setTab,
  setPage,
  addToFavorite,
  removeFromFavorite,
}) {
  const myArticlesTab = { id: MY_ARTICLES, displayName: "My Articles" };
  const favoriteArticlesTab = {
    id: FAVORITE_ARTICLES,
    displayName: "Favorite Articles",
  };

  return (
    <div className="profile-page">
      <ProfileInfo currentUser={currentUser} profile={profile} />

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <Tabs
              values={[myArticlesTab, favoriteArticlesTab]}
              selectedValue={selectedTab}
              setValue={setTab}
            />

            <ArticlesList
              articles={articles}
              pagging={pagging}
              addToFavorite={addToFavorite}
              removeFromFavorite={removeFromFavorite}
              setPage={setPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const user = {
    isAuthenticated: true,
    username: "Eric Simons",
    image: "http://i.imgur.com/Qr71crq.jpg",
    bio: "Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games"
  };

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
  const selectedTab = MY_ARTICLES;

  const setPage = function (i) {
    alert(`Go to page ${i}`);
  };
  const addToFavorite = function (i) {
    alert(`Add article ${i} to favorite`);
  };
  const removeFromFavorite = function (i) {
    alert(`Remove article from ${i} favorite`);
  };
  const setTab = function (i) {
    alert(`Set tab to ${i}`);
  };

  return (
    <dev>
      <Header user={user} />
      <ProfilePageContent
        currentUser={user}
        profile={user}
        articles={articles}
        pagging={pagging}
        selectedTab={selectedTab}
        setTab={setTab}
        setPage={setPage}
        addToFavorite={addToFavorite}
        removeFromFavorite={removeFromFavorite}
      />
      <Footer />
    </dev>
  );
}
