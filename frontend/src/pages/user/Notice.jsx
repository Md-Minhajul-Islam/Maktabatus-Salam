import { useEffect, useState } from "react";
import axios from "axios";
import Menu from "../../components/Menu";
import TextCard from "../../components/TextCard";
import API_BASE_URL from "../../config";

const Notice = () => {
  const [notice, setNotice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const noticeRes = await axios.get(`${API_BASE_URL}/notice`, {
          withCredentials: true,
        });
        setNotice(noticeRes.data);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading)
    return (
      <div>
        <Menu />
        <p className="text-center mt-10 text-green-800 font-bold">
          Please wait...
        </p>
      </div>
    );
  if (error)
    return (
      <div>
        <Menu />
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );

  return (
    <div>
      <Menu />
      <div className="md:flex md:flex-col">
        <section className="h-screen md:w-3/4 md:mx-auto mt-1">
          {notice.map((notice) => (
            <TextCard key={notice.notice_id} data={notice} name={"notice"} />
          ))}
        </section>
      </div>
    </div>
  );
};

export default Notice;
