import { useState, useEffect } from "react";
import axios from "axios";

import QuranCard from "../components/QuranCard";
import ConfirmDialog from "../utils/ConfirmDialog";
import { FaTrash } from "react-icons/fa";
import API_BASE_URL from "../config";

const Quran = () => {
  const [quran, setQuran] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    verse_no: "",
    verse_arabic: "",
    verse_bangla: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const quranRes = await axios.get(`${API_BASE_URL}/quran`);
        setQuran(quranRes.data);
      } catch (err) {
        setError(err.response.data.message);
      } finally {
        setLoading(false);
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
      const response = await axios.post(
        `${API_BASE_URL}/quran`,
        formData,
        { withCredentials: true }
      );
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
      <p className="text-center mt-10 text-green-800 font-bold">Loading...</p>
    );
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  return (
    <div className="md:flex md:flex-col">
      <div className="p-3 md:w-3/4 md:mx-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col text-xs font-mono md:text-sm"
        >
          <input
            className="border-1 border-gray-500 m-0.5 rounded-xs"
            type="text"
            name="verse_no"
            value={formData.verse_no}
            onChange={handleChange}
            placeholder="Enter Verse no e.g., 002001 [2nd Chapter, 1st Verse]"
            required
          />
          <input
            className="border-1 border-gray-500 m-0.5 rounded-xs"
            type="text"
            name="verse_arabic"
            value={formData.verse_arabic}
            onChange={handleChange}
            placeholder="Enter Arabic text..."
            required
          ></input>
          <input
            className="border-1 border-gray-500 m-0.5 rounded-xs"
            type="text"
            name="verse_bangla"
            value={formData.verse_bangla}
            onChange={handleChange}
            placeholder="Enter Bangla translation..."
            required
          ></input>
          <button
            className="bg-green-800 text-white font-mono m-0.5 rounded-xs md:hover:cursor-pointer"
            type="submit"
          >
            Add Verse
          </button>
        </form>
      </div>
      {quran.map((verse) => (
        <div
          key={verse.verse_no}
          className="p-3 bg-gray-50 mb-1 text-sm relative text-right md:w-3/4 md:mx-auto md:text-base"
        >
          <button onClick={() => deleteVerse(verse.verse_no)}>
            <FaTrash className="text-gray-300 size-3 absolute top-2 left-3 md:text-gray-400 md:hover:cursor-pointer" />
          </button>
          <QuranCard data={verse} />
        </div>
      ))}
    </div>
  );
};

export default Quran;
