import axios from "axios";
import Config from "../../config/Config";
import { authHeaderValue, extractPayload } from "../../utils/utilityFunctions";

export async function getAllCommentByArticle(slug) {
  return axios
    .get(`${Config.apiRoot}/articles/${slug}/comments`)
    .then(extractPayload);
}

export async function createComment(token, slug, payload) {
  return axios
    .post(`${Config.apiRoot}/articles/${slug}/comments`, payload, {
      headers: { Authorization: authHeaderValue(token) },
    })
    .then(extractPayload);
}

export async function deleteComment(token, slug) {
  return axios
    .delete(`${Config.apiRoot}/articles/${slug}/comments`, {
      headers: { Authorization: authHeaderValue(token) },
    })
    .then(extractPayload);
}
