import { useDispatch, useSelector } from "react-redux";
import ArticlesListLayout from "../components/ArticlesListLayout";
import Tabs from "../components/Tabs";
import {
  loadTags,
  selectTags,
  selectTagsStatus,
} from "../features/tag/tagSlice";
import Status from "../utils/Status";
import { handleAndPreventDefault } from "../utils/utilityFunctions";
import {
  FilterType,
  filterByTags,
  filterGlobalFeed,
  filterMyFeed,
  selectArticleFilter,
} from "../features/article/articleSlice";
import { selectIsAuthenticated } from "../features/user/userSlice";

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
  const dispatch = useDispatch();

  const onClick = () => dispatch(filterByTags(tag));

  return (
    <a
      href=""
      className="tag-pill tag-default"
      onClick={handleAndPreventDefault(onClick)}
    >
      {tag}
    </a>
  );
}

function PopularTags() {
  const status = useSelector(selectTagsStatus);
  const tags = useSelector(selectTags);
  const dispatch = useDispatch();

  if (status === Status.IDLE) {
    dispatch(loadTags());
  }

  if (Array.isArray(tags) && tags.length !== 0) {
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
  } else {
    return <></>;
  }
}

export default function HomePage() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const filter = useSelector(selectArticleFilter);
  const dispatch = useDispatch();

  const setFeed = (tab) => {
    switch (tab) {
      case FilterType.GLOBAL_FEED:
        dispatch(filterGlobalFeed());
        break;
      case FilterType.MY_FEED:
        dispatch(filterMyFeed());
        break;
    }
  };

  const tabs = isAuthenticated
    ? [FilterType.GLOBAL_FEED, FilterType.MY_FEED]
    : [FilterType.GLOBAL_FEED];

  if (
    filter.type === FilterType.MY_ARTICLES ||
    filter.type === FilterType.FAVORITTE_ARTICLES
  ) {
    dispatch(filterGlobalFeed());
  } else if (filter.type === FilterType.TAG_SEARCH) {
    tabs.push({ id: filter.type.id, displayName: `#${filter.tag}` });
  }

  return (
    <div className="home-page">
      <Banner />

      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <Tabs
              values={tabs}
              selectedValue={filter.type}
              setValue={setFeed}
            />

            <ArticlesListLayout />
          </div>

          <div className="col-md-3">
            <PopularTags />
          </div>
        </div>
      </div>
    </div>
  );
}
