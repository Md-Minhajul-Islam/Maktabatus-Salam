import axios from "axios";

export default async function CheckLoggedIn() {
  // return true;
  try {
    const response = await axios.get("http://localhost:5000/check", {
      withCredentials: true,
    });
    if (response.data.loggedIn) return true;
    else return false;
  } catch (err) {
    console.log(err);
    return false;
  }
}
