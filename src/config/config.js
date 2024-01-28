const Config = Object.freeze({
  apiRoot: process.env.REACT_APP_BACKEND_URL ?? "https://api.realworld.io/api",
  articlesPerPage: 10,
});

export default Config;
