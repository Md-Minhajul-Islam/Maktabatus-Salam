import { useEffect, useState } from "react";
import CheckLoggedIn from "../../utils/CheckLoggedIn";

const Quran = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLoggedInStatus = async () => {
      const status = await CheckLoggedIn();
      setLoggedIn(status);
      setLoading(false);
    };
    fetchLoggedInStatus();
  }, []);

  if (loading)
    return (
      <p className="text-center mt-10 text-green-800 font-bold">
        Please wait...
      </p>
    );

  if (!loggedIn)
    return (
      <p className="text-red-500 text-lg font-bold text-center m-5">
        Unauthorized!
      </p>
    );
  return <div>Hello</div>;
};

export default Quran;
