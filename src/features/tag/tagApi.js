import axios from "axios";
import Config from "../../config/Config";
import { extractPayload } from "../../utils/utilityFunctions";

export async function getAllTags() {
  return axios.get(`${Config.apiRoot}/tags`).then(extractPayload);
}
