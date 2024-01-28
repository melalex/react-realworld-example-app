import axios from "axios";
import Config from "../../config/Config";
import { authHeaderValue, extractPayload } from "../../utils/utilityFunctions";

export async function getFeed(token, pagging) {
  return axios
    .get(`${Config.apiRoot}/articles/feed`, {
      headers: {
        Authorization: authHeaderValue(token),
      },
      params: { limit: pagging.limit, offset: pagging.offset },
    })
    .then(extractPayload);
}

export async function getAllArticles(filter, pagging) {
  return axios
    .get(`${Config.apiRoot}/articles`, {
      params: { ...filter, limit: pagging.limit, offset: pagging.offset },
    })
    .then(extractPayload);
}

export async function getOneArticle(slug) {
  return axios.get(`${Config.apiRoot}/articles/${slug}`).then(extractPayload);
}

export async function createArticle(token, body) {
  return axios
    .post(`${Config.apiRoot}/articles`, body, {
      headers: { Authorization: authHeaderValue(token) },
    })
    .then(extractPayload);
}

export async function editArticle(token, slug, body) {
  return axios
    .put(`${Config.apiRoot}/articles/${slug}`, body, {
      headers: { Authorization: authHeaderValue(token) },
    })
    .then(extractPayload);
}

export async function deleteArticle(token, slug) {
  return axios
    .delete(`${Config.apiRoot}/articles/${slug}`, {
      headers: { Authorization: authHeaderValue(token) },
    })
    .then(extractPayload);
}

export async function favoriteArticle(token, slug) {
  return axios
    .post(
      `${Config.apiRoot}/articles/${slug}/favorite`,
      {},
      {
        headers: { Authorization: authHeaderValue(token) },
      }
    )
    .then(extractPayload);
}

export async function unfavoriteArticle(token, slug) {
  return axios
    .delete(`${Config.apiRoot}/articles/${slug}/favorite`, {
      headers: { Authorization: authHeaderValue(token) },
    })
    .then(extractPayload);
}
