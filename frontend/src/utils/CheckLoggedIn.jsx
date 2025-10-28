import axios from "axios";
import API_BASE_URL from "../config";

export default async function CheckLoggedIn() {
  try {
    const response = await axios.get(`${API_BASE_URL}/check`, {
      withCredentials: true,
    });
    return true;
  } catch (err) {
    return false;
  }
}
