import { useEffect, useState } from "react";
import axios from "axios";
import CheckLoggedIn from "../../utils/CheckLoggedIn";
import AdminMenu from "../../components/AdminMenu";
import QuranCard from "../../components/QuranCard";
import ConfirmDialog from "../../utils/ConfirmDialog";
import { FaTrash } from "react-icons/fa";
import API_BASE_URL from "../../config";

const Quran = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quran, setQuran] = useState([]);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    verse_no: "",
    verse_arabic: "",
    verse_bangla: "",
  });

  useEffect(() => {
    const fetchLoggedInStatus = async () => {
      const status = await CheckLoggedIn();
      setLoggedIn(status);
      setLoading(false);
    };
    fetchLoggedInStatus();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quranRes = await axios.get(`${API_BASE_URL}/quran`,{
        withCredentials: true,
      });
        setQuran(quranRes.data);
      } catch (err) {
        setError(err.response.data.message);
      }
    };
    fetchData();
  }, []);

  const deleteVerse = async (verse_no) => {
    const confirmed = await ConfirmDialog();
    if (!confirmed) return;

    try {
      const deleteRes = await axios.delete(`${API_BASE_URL}/quran`, {
        data: { verse_no },
        withCredentials: true,
      });
      setQuran((prev) => prev.filter((v) => v.verse_no !== verse_no));
    } catch (err) {
      setError(err.response.data.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_BASE_URL}/quran`, formData, {
        withCredentials: true,
      });
      console.log(response);
      console.log(response.data);
      setQuran((prev) => [response.data.data, ...prev]);
      setFormData({ verse_no: "", verse_arabic: "", verse_bangla: "" });
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  if (loading)
    return (
      <div>
        <AdminMenu />
        <p className="text-center mt-10 text-green-800 font-bold">
          Please wait...
        </p>
      </div>
    );
  if (!loggedIn)
    return (
      <div>
        <AdminMenu />
        <p className="text-red-500 text-lg font-bold text-center m-5">
          Unauthorized!
        </p>
      </div>
    );

  if (error)
    return (
      <div>
        <AdminMenu />
        <p className="text-red-500 text-center">{error}</p>
      </div>
    );
  return (
    <div>
      <AdminMenu />
      <div className="md:flex md:flex-col">
        <div className="p-3 md:w-3/4 md:mx-auto">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col text-sm font-mono md:text-base"
          >
            <input
              className="border-1 border-gray-500 m-0.5 rounded-xs"
              type="text"
              name="verse_no"
              value={formData.verse_no}
              onChange={handleChange}
              placeholder="Verse no = 002001 [2nd Chapter, 1st Verse]"
              required
            />
            <input
              className="border-1 border-gray-500 m-0.5 rounded-xs"
              type="text"
              name="verse_arabic"
              value={formData.verse_arabic}
              onChange={handleChange}
              placeholder="Arabic text..."
              required
            ></input>
            <input
              className="border-1 border-gray-500 m-0.5 rounded-xs"
              type="text"
              name="verse_bangla"
              value={formData.verse_bangla}
              onChange={handleChange}
              placeholder="Bangla translation..."
              required
            ></input>
            <button
              className="bg-green-800 text-white text-sm md:text-base w-20 mx-auto md:w-30 text-center font-mono m-0.5 rounded-sm md:hover:cursor-pointer"
              type="submit"
            >
              Add Verse
            </button>
          </form>
        </div>
        {quran.map((verse) => (
          <div
            key={verse.verse_no}
            className="hover:bg-green-50 transition-colors duration-200 bg-gray-50 p-3 mb-1 text-sm rounded-xl relative text-right md:w-3/4 md:mx-auto md:text-base"
          >
            <button onClick={() => deleteVerse(verse.verse_no)}>
              <FaTrash className="text-gray-300 size-3 absolute top-2 left-3 md:text-gray-400 md:hover:cursor-pointer" />
            </button>
            <QuranCard data={verse} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quran;
