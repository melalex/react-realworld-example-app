import axios from "axios";
import Config from "../../config/Config";
import { extractPayload } from "../../utils/utilityFunctions";

export async function login(email, password) {
  const payload = {
    user: {
      email: email,
      password: password,
    },
  };

  return axios
    .post(`${Config.apiRoot}/users/login`, payload)
    .then(extractPayload);
}

export async function createUser(username, email, password) {
  const payload = {
    user: {
      username: username,
      email: email,
      password: password,
    },
  };

  return axios.post(`${Config.apiRoot}/users`, payload).then(extractPayload);
}

export async function modifyUser(token, username, email, password, bio, image) {
  const payload = {
    user: {
      username: username,
      email: email,
      password: password,
      bio: bio,
      image: image,
    },
  };

  return axios
    .put(`${Config.apiRoot}/user`, payload, {
      headers: { Authorization: `Token ${token}` },
    })
    .then(extractPayload);
}

export async function getUserByToken(token) {
  return axios
    .get(`${Config.apiRoot}/user`, {
      headers: { Authorization: `Token ${token}` },
    })
    .then(extractPayload);
}
