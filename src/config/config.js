const Config = Object.freeze({
  apiRoot:
    process.env.REACT_APP_BACKEND_URL ??
    "https://conduit.productionready.io/api",
});

export default Config;
