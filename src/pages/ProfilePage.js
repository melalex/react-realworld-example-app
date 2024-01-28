import { useDispatch, useSelector } from "react-redux";
import FollowButton from "../components/FollowButton";
import Tabs from "../components/Tabs";
import { selectUser } from "../features/user/userSlice";
import ArticlesListLayout from "../components/ArticlesListLayout";
import { useParams } from "react-router";
import {
  getProfile,
  selectProfile,
} from "../features/profile/profileSlice";
import Status from "../utils/Status";
import {
  FilterType,
  filterFavoriteArticles,
  filterMyArticles,
  selectArticleFilter,
} from "../features/article/articleSlice";

function ProfileAction({ currentUser, profile }) {
  if (
    currentUser.isAuthenticated &&
    currentUser.profile.username === profile.data.username
  )
    return (
      <button className="btn btn-sm btn-outline-secondary action-btn">
        <i className="ion-gear-a"></i>
        &nbsp; Edit Profile Settings
      </button>
    );
  else
    return (
      <FollowButton
        isAuthenticated={currentUser.isAuthenticated}
        followingStatus={profile.data.followingStatus}
        username={profile.data.username}
        isFollowng={profile.data.following}
      />
    );
}

function ProfileInfo({ currentUser, profile }) {
  return (
    <div className="user-info">
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <img src={profile.data.image} className="user-img" />
            <h4>{profile.data.username}</h4>
            <p>{profile.data.bio}</p>
            <ProfileAction currentUser={currentUser} profile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  const currentUser = useSelector(selectUser);
  const profile = useSelector(selectProfile);
  const filter = useSelector(selectArticleFilter);

  const dispatch = useDispatch();
  const { username } = useParams();

  const setFeed = (tab) => {
    switch (tab) {
      case FilterType.MY_ARTICLES:
        dispatch(filterMyArticles(username));
        break;
      case FilterType.FAVORITTE_ARTICLES:
        dispatch(filterFavoriteArticles(username));
        break;
    }
  };

  if (
    filter.type === FilterType.GLOBAL_FEED ||
    filter.type === FilterType.MY_FEED ||
    filter.type === FilterType.TAG_SEARCH
  ) {
    dispatch(filterMyArticles(username));
  }

  if (profile.status === Status.IDLE || profile.data?.username !== username) {
    dispatch(getProfile(username));
  }

  if (profile.status === Status.LOADING) {
    return (
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">Loading...</div>
          </div>
        </div>
      </div>
    );
  } else
    return (
      <div className="profile-page">
        <ProfileInfo currentUser={currentUser} profile={profile} />

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <Tabs
                values={[FilterType.MY_ARTICLES, FilterType.FAVORITTE_ARTICLES]}
                selectedValue={filter.type}
                setValue={setFeed}
              />

              <ArticlesListLayout />
            </div>
          </div>
        </div>
      </div>
    );
}
