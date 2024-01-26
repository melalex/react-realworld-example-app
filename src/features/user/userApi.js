import axios from "axios";
import Config from "../../config/Config";
import { handleApiError } from "../../utils/utilityFunctions";

export async function login(email, password) {
  const payload = {
    user: {
      email: email,
      password: password,
    },
  };

  return axios.post(`${Config.apiRoot}/users/login`, payload);
}

export async function createUser(username, email, password) {
  const payload = {
    user: {
      username: username,
      email: email,
      password: password,
    },
  };

  return axios.post(`${Config.apiRoot}/users`, payload);
}

export async function modifyUser(username, email, password, bio, image) {
  const payload = {
    user: {
      username: username,
      email: email,
      password: password,
      bio: bio,
      image: image,
    },
  };

  return axios.put(`${Config.apiRoot}/user`, payload);
}

export async function getUserByToken(token) {
  return axios.get(`${Config.apiRoot}/user`, {
    headers: { Authorization: `Token ${token}` },
  });
}
