import {
  createAsyncThunk,
  createEntityAdapter,
  createSlice,
} from "@reduxjs/toolkit";
import Status from "../../utils/Status";
import * as articleApi from "./articleApi";
import {
  errorReducer,
  handleApiError,
  pageToLimmitAndOffcet,
  pendingReducer,
} from "../../utils/utilityFunctions";
import { selectToken } from "../user/userSlice";
import Config from "../../config/Config";

export const FavoriteStatus = Object.freeze({
  FAVORITE: { value: "favorite" },
  NOT_FAVORITE: { value: "not-favorite" },
  UPDATING: { value: "updating" },
});

export const FilterType = Object.freeze({
  MY_FEED: { id: "my-feed", displayName: "My Feed" },
  GLOBAL_FEED: { id: "global-feed", displayName: "Global Feed" },
  MY_ARTICLES: { id: "my-articles", displayName: "My Articles" },
  FAVORITTE_ARTICLES: {
    id: "favorite-articles",
    displayName: "Favorite Articles",
  },
  TAG_SEARCH: { id: "tag-search", displayName: "Tag Search" },
});

const articleAdapter = createEntityAdapter({
  selectId: (it) => it.slug,
});

const initialState = articleAdapter.getInitialState({
  status: Status.IDLE,
  page: 1,
  pageCount: 0,
  errors: [],
  filter: {
    type: FilterType.GLOBAL_FEED,
  },
});

function articlePagging(page) {
  return pageToLimmitAndOffcet(page, Config.articlesPerPage);
}

function favoriteStatus(favorited) {
  return favorited ? FavoriteStatus.FAVORITE : FavoriteStatus.NOT_FAVORITE;
}

function enchanceArticle(article) {
  article.favoritedStatus = favoriteStatus(article.favorited);

  return article;
}

const successListReducer = (state, action) => {
  state.status = Status.SUCCESS;
  state.pageCount = Math.ceil(
    action.payload.articlesCount / Config.articlesPerPage
  );

  articleAdapter.setAll(state, action.payload.articles.map(enchanceArticle));
};

const successOneReducer = (state, action) => {
  state.status = Status.SUCCESS;

  articleAdapter.setOne(state, enchanceArticle(action.payload.article));
};

const successSingleReducer = (state, action) => {
  articleAdapter.upsertOne(state, enchanceArticle(action.payload.article));
};

const pendingFollowingReducer = (state, action) => {
  const article = state.entities[action.meta.arg];

  article.favoritedStatus = FavoriteStatus.UPDATING;
};

const errorFollowingReducer = (state, action) => {
  const article = state.entities[action.payload.slug];

  article.favoritedStatus = favoriteStatus(article.favorited);
};

export const loadArticles = createAsyncThunk(
  "article/loadArticles",
  async (_, { getState }) => {
    const state = getState();
    const filter = selectArticleFilter(state);
    const paging = articlePagging(selectArticlePage(state));

    switch (filter.type) {
      case FilterType.MY_FEED:
        return articleApi.getFeed(selectToken(state), paging);

      case FilterType.GLOBAL_FEED:
        return articleApi.getAllArticles({}, paging);

      case FilterType.MY_ARTICLES:
        return articleApi.getAllArticles({ author: filter.username }, paging);

      case FilterType.FAVORITTE_ARTICLES:
        return articleApi.getAllArticles(
          { favorited: filter.username },
          paging
        );

      case FilterType.TAG_SEARCH:
        return articleApi.getAllArticles({ tag: filter.tag }, paging);

      default:
        return Promise.reject(
          new Error(`Unexpected filter type: ${filter.type.id}`)
        );
    }
  }
);

export const loadOneArticle = createAsyncThunk(
  "article/loadOneArticle",
  async (slug) => articleApi.getOneArticle(slug)
);

export const switchFavoriteStatus = createAsyncThunk(
  "article/switchFavoriteStatus",
  async (slug, { getState }) => {
    const state = getState();
    const article = selectArticleById(state, slug);
    const token = selectToken(state);

    if (article.favorited) {
      return articleApi.unfavoriteArticle(token, slug);
    } else {
      return articleApi.favoriteArticle(token, slug);
    }
  }
);

export const createArticle = createAsyncThunk(
  "article/createArticle",
  async (payload, { getState, rejectWithValue }) => {
    const state = getState();
    const token = selectToken(state);

    return articleApi
      .createArticle(token, { article: payload })
      .catch((error) => handleApiError(error, rejectWithValue));
  }
);

export const editArticle = createAsyncThunk(
  "article/editArticle",
  async ({ slug, payload }, { getState, rejectWithValue }) => {
    const state = getState();
    const token = selectToken(state);

    return articleApi
      .editArticle(token, slug, { article: payload })
      .catch((error) => handleApiError(error, rejectWithValue));
  }
);

export const deleteArticle = createAsyncThunk(
  "article/deleteArticle",
  async (slug, { getState }) => {
    const state = getState();
    const token = selectToken(state);

    return articleApi.deleteArticle(token, slug);
  }
);

export const articleSlice = createSlice({
  name: "article",
  initialState: initialState,
  reducers: {
    reInitArticles: () => initialState,
    filterGlobalFeed: (state) => {
      state.status = Status.IDLE;
      state.page = 1;
      state.pageCount = 0;
      state.filter = {
        type: FilterType.GLOBAL_FEED,
      };
      articleAdapter.removeAll(state);
    },
    filterMyFeed: (state) => {
      state.status = Status.IDLE;
      state.page = 1;
      state.pageCount = 0;
      state.filter = {
        type: FilterType.MY_FEED,
      };
      articleAdapter.removeAll(state);
    },
    filterMyArticles: (state, action) => {
      state.status = Status.IDLE;
      state.page = 1;
      state.pageCount = 0;
      state.filter = {
        type: FilterType.MY_ARTICLES,
        username: action.payload,
      };
      articleAdapter.removeAll(state);
    },
    filterFavoriteArticles: (state, action) => {
      state.status = Status.IDLE;
      state.page = 1;
      state.pageCount = 0;
      state.filter = {
        type: FilterType.FAVORITTE_ARTICLES,
        username: action.payload,
      };
      articleAdapter.removeAll(state);
    },
    filterByTags: (state, action) => {
      state.status = Status.IDLE;
      state.page = 1;
      state.pageCount = 0;
      state.filter = {
        type: FilterType.TAG_SEARCH,
        tag: action.payload,
      };
      articleAdapter.removeAll(state);
    },
    setPage: (state, action) => {
      state.status = Status.IDLE;
      state.page = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(loadArticles.pending, pendingReducer)
      .addCase(loadArticles.fulfilled, successListReducer)
      .addCase(loadArticles.rejected, errorReducer);

    builder
      .addCase(loadOneArticle.pending, pendingReducer)
      .addCase(loadOneArticle.fulfilled, successOneReducer)
      .addCase(loadOneArticle.rejected, errorReducer);

    builder
      .addCase(createArticle.pending, pendingReducer)
      .addCase(createArticle.fulfilled, successOneReducer)
      .addCase(createArticle.rejected, errorReducer);

    builder
      .addCase(editArticle.pending, pendingReducer)
      .addCase(editArticle.fulfilled, successOneReducer)
      .addCase(editArticle.rejected, errorReducer);

    builder
      .addCase(deleteArticle.pending, pendingReducer)
      .addCase(deleteArticle.fulfilled, (state, action) =>
        articleAdapter.removeOne(state, action.payload.article.slug)
      )
      .addCase(deleteArticle.rejected, errorReducer);

    builder
      .addCase(switchFavoriteStatus.pending, pendingFollowingReducer)
      .addCase(switchFavoriteStatus.fulfilled, successSingleReducer)
      .addCase(switchFavoriteStatus.rejected, errorFollowingReducer);
  },
});

export const {
  reInitArticles,
  filterGlobalFeed,
  filterMyFeed,
  filterMyArticles,
  filterFavoriteArticles,
  filterByTags,
  setPage,
} = articleSlice.actions;

export const selectArticle = (state) => state.article;

export const { selectById: selectArticleById, selectIds: selectArticleIds } =
  articleAdapter.getSelectors(selectArticle);

export const selectArticleListStatus = (state) => selectArticle(state).status;
export const selectArticleListErrors = (state) => selectArticle(state).errors;
export const selectArticleFilter = (state) => selectArticle(state).filter;
export const selectArticlePage = (state) => selectArticle(state).page;
export const selectArticlePageCount = (state) => selectArticle(state).pageCount;

export default articleSlice.reducer;
