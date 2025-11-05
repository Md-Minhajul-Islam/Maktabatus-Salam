import { useEffect, useState } from "react";
import axios from "axios";
import CheckLoggedIn from "../../utils/CheckLoggedIn";
import AdminMenu from "../../components/AdminMenu";
import QuranCard from "../../components/QuranCard";
import ConfirmDialog from "../../utils/ConfirmDialog";
import { FaTrash, FaTimes } from "react-icons/fa";
import AddPostIcon from "/images/add-post-icon.png";
import API_BASE_URL from "../../config";

const Quran = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [quran, setQuran] = useState([]);
  const [error, setError] = useState(null);
  const [showVerseForm, setShowVerseForm] = useState(false);
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
        const quranRes = await axios.get(`${API_BASE_URL}/quran`, {
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
      <div className="flex flex-col items-center px-4 md:px-8 lg:px-16 space-y-6">
        {/* Verse Form */}
        {showVerseForm && (
          <div className="w-full md:w-3/4 bg-white p-1 rounded-xl shadow-md">
            <div className="flex justify-end">
              <button
                onClick={() => setShowVerseForm(!showVerseForm)}
                className="text-gray-500 hover:text-red-500 transition"
              >
                <FaTimes className="text-lg mb-2" />
              </button>
            </div>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col space-y-3 text-xs md:text-base font-mono"
            >
              <input
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                type="text"
                name="verse_no"
                value={formData.verse_no}
                onChange={handleChange}
                placeholder="Verse no = 002001 [2nd Chapter, 1st Verse]"
                required
              />
              <input
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                type="text"
                name="verse_arabic"
                value={formData.verse_arabic}
                onChange={handleChange}
                placeholder="Arabic text..."
                required
              />
              <input
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
                type="text"
                name="verse_bangla"
                value={formData.verse_bangla}
                onChange={handleChange}
                placeholder="Bangla translation..."
                required
              />
              <button
                type="submit"
                className="bg-green-700 hover:bg-green-800 text-white font-mono px-6 py-2 rounded-lg mx-auto transition-transform hover:scale-105"
              >
                Add Verse
              </button>
            </form>
          </div>
        )}
        {!showVerseForm && (
          <div className="w-full md:w-3/4 flex justify-end mt-2 mb-1">
            <button
              title="Add Verse"
              onClick={() => setShowVerseForm(true)}
              className="flex items-center text-green-700 font-bold hover:cursor-pointer"
            >
              <img className="w-6" src={AddPostIcon} alt="Add+" />
            </button>
          </div>
        )}

        {/* Verses List */}
        <div className="w-full md:w-3/4 space-y-4">
          {quran.map((verse) => (
            <div
              key={verse.verse_no}
              className="relative bg-gray-50 p-2 rounded-xl shadow hover:shadow-lg hover:bg-green-50 transition-colors duration-200 text-right"
            >
              <button
                onClick={() => deleteVerse(verse.verse_no)}
                className="absolute top-2 left-2 text-red-400 hover:text-red-500 text-sm md:text-base"
              >
                <FaTrash />
              </button>
              <br />
              <QuranCard data={verse} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Quran;
