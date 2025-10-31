import axios from "axios";
import API_BASE_URL from "../config";

export default async function CheckLoggedIn() {
  try {
    const response = await axios.get(`${API_BASE_URL}/check`, {
      withCredentials: true,
    });
    if (response.data.loggedIn) return true;
    else return false;
  } catch (err) {
    return false;
  }
}
