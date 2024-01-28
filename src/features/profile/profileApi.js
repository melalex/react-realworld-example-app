import axios from "axios";
import Config from "../../config/Config";
import { authHeaderValue, extractPayload } from "../../utils/utilityFunctions";

export async function getProfileByUsername(username) {
  return axios
    .get(`${Config.apiRoot}/profiles/${username}`)
    .then(extractPayload);
}

export async function followProfileByUsername(token, username) {
  return axios
    .post(
      `${Config.apiRoot}/profiles/${username}/follow`,
      {},
      {
        headers: { Authorization: authHeaderValue(token) },
      }
    )
    .then(extractPayload);
}

export async function unfollowProfileByUsername(token, username) {
  return axios
    .delete(`${Config.apiRoot}/profiles/${username}/follow`, {
      headers: { Authorization: authHeaderValue(token) },
    })
    .then(extractPayload);
}
